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

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  private playList: PlaylistTrack[];
  index: number;
  playerEvents: PlayerEvents;

  constructor() {
    this.index = 0;
    this.playerEvents = {
      onEnd$: new EventEmitter(),
      onStop$: new EventEmitter(),
      onPlay$: new EventEmitter(),
      onPause$: new EventEmitter(),
      playing$: new EventEmitter()
    };
  }

  init(tracks) {
    this.playList = initPlaylist(tracks, this.playerEvents);
  }

  playNew(i) {
    newSong(this.playList, i, this.index = i);
  }

  playNext() {
    stop(this.playList[this.index]);
    let index = this.index + 1;
    if (index < this.playList.length) {
      this.playNew(index);
      this.index = index;
    }
  }

  playPrevious() {
    stop(this.playList[this.index]);
    let index = this.index - 1;
    if (index >= 0) {
      this.playNew(index);
      this.index = index;
    }
  }

  stop() {
    stop(this.playList[this.index]);
  }

  play() {
    play(this.playList[this.index]);
  }

  pause() {
    pause(this.playList[this.index]);
  }
}
