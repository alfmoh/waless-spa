import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";
import {
  LoadQueueSuccess,
  LoadQueue
} from "src/app/core/components/state/queue/queue.actions";
import * as fromSharedActions from "../../shared/state/shared.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  trackList = [];

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService,
    private store: Store<any>,
    private router: Router
  ) {}

  initTracks(tracks: Track[], trackIndex: number): void {
    this.trackList = tracks;
    this.store.dispatch(new LoadQueueSuccess(tracks));
    this.store.dispatch(
      new fromSharedActions.SetCurrentlyPlayingTrack(tracks[trackIndex])
    );
    this.playerService.init(tracks);
  }

  play(index) {
    if (this.router.url !== "/queue") this.store.dispatch(new LoadQueue());
    isNaN(parseFloat(index))
      ? this.playerService.play(this.trackList)
      : this.playerService.playNew(index, this.trackList);
    // isNaN(parseFloat(index))
    //   ? this.store.pipe(select(fromArtist.getArtistTopTracks),take(1)).subscribe(q => {
    //     if (q) this.playerService.play(q);
    //   })
    //   : this.store.pipe(select(fromArtist.getArtistTopTracks),take(1)).subscribe(q => {
    //     if (q) this.playerService.playNew(index, q);
    //   });
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

  next() {
    this.playerService.playNext(this.trackList);
  }

  previous() {
    this.playerService.playPrevious(this.trackList);
  }

  isPlaying() {
    return this.playerService.playing;
  }

  onEnd() {
    this.next();
  }

  startAlbum(album) {
    if (!album.tracks) {
      this.deezer
        .getTrackList(album.tracklist)
        .subscribe((tracks: Track[]) => this.processTracks(tracks));
    } else {
      this.processTracks(album.tracks.data || album.tracks);
    }
    this.store.dispatch(new fromSharedActions.CurrentlyPlayingAlbum(album));
  }

  startSelectedTrack(tracks, trackIndex, album = null, type = "") {
    if (!album || type === "playlist")
      this.store.dispatch(
        new fromSharedActions.SetCurrentlyPlayingTrack(tracks[trackIndex])
      );
    else {
      tracks.map(playlistTrack => (playlistTrack.album = album));
      this.store.dispatch(
        new fromSharedActions.SetCurrentlyPlayingTrack(tracks[trackIndex])
      );
    }
    this.processTracks(tracks, trackIndex);
  }

  initializeQueue(tracks, index, isQueue) {
    this.processTracks(tracks, index, isQueue);
  }

  private processTracks(tracks: any, index = null, isQueue = false) {
    if (isQueue) this.playerService.init(tracks);
    else {
      if (isNaN(parseFloat(index))) index = 0;
      this.initTracks(tracks, index);
    }
    this.play(index);
  }
}
