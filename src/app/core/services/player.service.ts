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
import { Title } from "@angular/platform-browser";
import { Track } from "../../shared/models/Track";
import { BehaviorSubject } from "rxjs";

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
  siteTitle = "";
  currentTrack = null;
  currentTrack$ = new BehaviorSubject<any>(this.currentTrack);

  constructor(private titleService: Title) {
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
    if (this.playing) this.stop();
    this.tracks = tracks;
    this.playList = initPlaylist(tracks, this.playerEvents);
  }

  playNew(i, queArr) {
    if (this.playing) this.stop();
    newSong(this.playList, (this.index = i));
    this.playing = true;
    this.setQueue(queArr)
    this.siteTitle = this.getSiteTitle(this.currentTrack);
    this.titleService.setTitle(this.siteTitle);
  }

  playNext(queueArr) {
    if (this.playing) this.stop();
    let index = this.index + 1;
    if (index < this.playList.length) {
      this.playNew(index, queueArr);
      this.index = index;
    }
  }

  playPrevious(queueArr) {
    if (this.playing) this.stop();
    let index = this.index - 1;
    if (index >= 0) {
      this.playNew(index, queueArr);
      this.index = index;
    }
    this.siteTitle = this.getSiteTitle(this.currentTrack);
    this.titleService.setTitle(this.siteTitle);
  }

  stop() {
    stop(this.playList[this.index]);
    this.playing = false;
  }

  play(queArr) {
    if (this.playing && !this.paused) this.stop();
    play(this.playList[this.index]);
    this.playing = true;
    this.setQueue(queArr)
    this.siteTitle = this.getSiteTitle(this.currentTrack);
    this.titleService.setTitle(this.siteTitle);
  }

  pause() {
    pause(this.playList[this.index]);
    this.paused = true;
    this.playing = false;
  }

  private getSiteTitle(track: any): string {
    return `${track.title_short} - ${this.tracks[this.index].artist.name}`;
  }

  setQueue(tracks) {
    this.currentTrack = tracks[this.index]
    this.currentTrack$.next(tracks[this.index]);
  }
}
