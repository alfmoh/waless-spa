import { Injectable, EventEmitter } from "@angular/core";
import { PlaylistTrack } from "../../shared/models/PlaylistTrack";
import { PlayerEvents } from "../../shared/models/PlayerEvents";
import {
  initPlaylist,
  newSong,
  stop,
  pause,
  play
} from "../../shared/helpers/playerfunctions";
import { Track } from "../../shared/models/Track";
import { Store } from "@ngrx/store";
import * as fromSharedActions from "../../shared/state/shared.actions";
import { siteTitle } from "src/app/shared/helpers/constants";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  private playList: PlaylistTrack[];
  private tracks: Track[];
  index: number;
  playerEvents: PlayerEvents;
  playing = false;
  paused: boolean;
  currentTrack = null;

  constructor(private store: Store<any>) {
    this.index = 0;
    this.playerEvents = {
      onEnd$: new EventEmitter(),
      onStop$: new EventEmitter(),
      onPlay$: new EventEmitter(),
      onPause$: new EventEmitter(),
      playing$: new EventEmitter()
    };
  }

  init(tracks: Track[]) {
    if (this.playing) this.stop();
    this.tracks = tracks;
    this.playList = initPlaylist(tracks, this.playerEvents);
  }

  playNew(i: number, queArr: any[]) {
    if (this.playing) this.stop();
    newSong(this.playList, (this.index = i));
    this.playing = true;
    this.setCurrentTrack(queArr);
    this.store.dispatch(
      new fromSharedActions.SetCurrentlyPlayingTrack(this.currentTrack)
    );
  }

  playNext(queueArr: any[]) {
    if (this.playing) this.stop();
    const index = this.index + 1;
    if (index < this.playList.length) {
      this.playNew(index, queueArr);
      this.index = index;
    }
  }

  playPrevious(queueArr: any[]) {
    if (this.playing) this.stop();
    const index = this.index - 1;
    if (index >= 0) {
      this.playNew(index, queueArr);
      this.index = index;
    }
  }

  stop() {
    stop(this.playList[this.index]);
    this.playing = false;
  }

  play(queArr: any[] | Track[]) {
    if (queArr.length === 0) queArr = this.tracks;
    if (this.playing && !this.paused) this.stop();
    play(this.playList[this.index]);
    this.playing = true;
    this.setCurrentTrack(queArr);
    this.store.dispatch(
      new fromSharedActions.SetCurrentlyPlayingTrack(this.currentTrack)
    );
    this.store.dispatch(new fromSharedActions.IsPlaying(true));
  }

  pause() {
    pause(this.playList[this.index]);
    this.paused = true;
    this.playing = false;
  }

  getSiteTitle(track: any): string {
    if (track) return `${track.title_short} - ${track.artist.name}`;
    return siteTitle;
  }

  setCurrentTrack(tracks: any[]) {
    this.currentTrack = tracks[this.index];
  }
}
