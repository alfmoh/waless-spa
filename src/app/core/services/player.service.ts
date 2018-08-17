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
  playing = false;
  paused: boolean;

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
    if(this.playing) this.stop();
    this.playList = initPlaylist(tracks, this.playerEvents);
  }

  playNew(i) {
    if(this.playing) this.stop();
    newSong(this.playList,this.index = i);
    this.playing = true;
  }

  playNext() {
    if(this.playing) this.stop();
    let index = this.index + 1;
    if (index < this.playList.length) {
      this.playNew(index);
      this.index = index;
    }
  }

  playPrevious() {
    if(this.playing) this.stop();
    let index = this.index - 1;
    if (index >= 0) {
      this.playNew(index);
      this.index = index;
    }
  }

  stop() {
    stop(this.playList[this.index]);
    this.playing = false;
  }

  play() {
    if(this.playing && !this.paused) this.stop();
    play(this.playList[this.index]);
    this.playing = true;
  }

  pause() {
    pause(this.playList[this.index]);
    this.paused = true;
    this.playing = false;
  }
}
