import { Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromRoot from "src/app/state/app.state";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as queueActions from "./queue.actions";
import * as fromQueue from "./queue.reducer";
import * as fromCurrentlyPlaying from "src/app/shared/components/state/currently-playing/currently-playing.reducer";
import { map, take, catchError, switchMap, tap } from "rxjs/operators";
import { Observable, combineLatest, of } from "rxjs";
import { Track } from "src/app/shared/models/Track";
import { PlayerHanlder } from "src/app/shared/helpers/playerhandler";
import { Album } from "src/app/shared/models/Album";

@Injectable()
export class QueueEffects {
  currentQueue$: Observable<Track[]>;
  currentlyPlaying$: Observable<Track>;
  currentPlayingAndQueue$: Observable<[Track[], Track]>;

  constructor(private action$: Actions, private store: Store<fromRoot.State>, private playerHandler: PlayerHanlder) {
    this.currentQueue$ = this.store.pipe(select(fromQueue.getQueue));
    this.currentlyPlaying$ = this.store.pipe(select(fromCurrentlyPlaying.getCurrentlyPlayingTrack));
    this.currentPlayingAndQueue$ = combineLatest(this.currentQueue$, this.currentlyPlaying$);

  }

  @Effect()
  playNext = this.action$.pipe(
    ofType(queueActions.QueueActionTypes.PlayNext),
    map((action: queueActions.PlayNext) => action.payload),
    switchMap(trackAndAlbum =>
      this.addToQueue(trackAndAlbum)
      .pipe(
        map(tracks => new queueActions.PlayNextSuccess(tracks)),
        catchError(err => of(new queueActions.PlayNextFail(err)))
      )
    )
  );

  private addToQueue(trackAndAlbum: {track: Track, album: Album}): Observable<Track[]> {
    const trackToBeAdded = trackAndAlbum.track;
    return this.currentPlayingAndQueue$.pipe(
      map(([tracks, currentlyPlayingTrack]) => {
        if (tracks) {
          let currentTrackId = 0;
          for (let i = 0, { length } = tracks; i < length; i++) {
            if (tracks[i].id === currentlyPlayingTrack.id) {
              currentTrackId = i;
              break;
            }
          }
          const updatedQueue = [...tracks];
          const insertedTrackedIndex = currentTrackId + 1;
          updatedQueue.splice(insertedTrackedIndex, 0, trackAndAlbum.track);
          this.playerHandler
            .startSelectedTrack(updatedQueue, insertedTrackedIndex, trackAndAlbum.album, "playNext");
          return updatedQueue;
        }
        this.playerHandler
          .startSelectedTrack([trackToBeAdded], 0, trackAndAlbum.album, "playNext");
        return [trackToBeAdded];
      }),
      take(1)
    );
  }
}


