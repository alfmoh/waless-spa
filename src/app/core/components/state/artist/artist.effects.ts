import * as artistActions from "./artist.actions";
import { DeezerService } from "./../../../../shared/services/deezer.service";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { of, forkJoin } from "rxjs";

@Injectable()
export class ArtistEffects {
  constructor(private actions$: Actions, private deezer: DeezerService) {}

  @Effect()
  loadArtist = this.actions$.pipe(
    ofType(artistActions.ArtistActionTypes.LoadArtist),
    map((action: artistActions.LoadArtist) => action.payload),
    mergeMap((artistId: number) =>
      this.deezer.getArtist(artistId).pipe(
        map(artist => new artistActions.LoadArtistSuccess(artist)),
        catchError(err => of(new artistActions.LoadArtistFail(err)))
      )
    )
  );

  @Effect()
  loadArtistTopTracks = this.actions$.pipe(
    ofType(artistActions.ArtistActionTypes.LoadArtistTopTracks),
    map((action: artistActions.LoadArtistTopTracks) => action.payload),
    mergeMap((artistId: number) =>
      this.deezer.getArtistTopTracks(artistId).pipe(
        map(tracks => new artistActions.LoadArtistTopTracksSuccess(tracks)),
        catchError(err => of(new artistActions.LoadArtistTopTracksFail(err)))
      )
    )
  );

  @Effect()
  loadArtistAndArtistTopTracks = this.actions$.pipe(
    ofType(artistActions.ArtistActionTypes.LoadArtistAndTopTracks),
    map((action: artistActions.LoadArtistAndTopTracks) => action.payload),
    switchMap((artistId: number) =>
      forkJoin([
        this.deezer.getArtist(artistId),
        this.deezer.getArtistTopTracks(artistId)
      ])
    ),
    map(data => new artistActions.LoadArtistAndTopTracksSuccess(data)),
    catchError(err => of(new artistActions.LoadArtistAndTopTracksFail(err)))
  );
}
