import { BehaviorSubject } from "rxjs";
import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";
import { sampleTracks } from "../temp/_lorem";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  isPlaying: boolean = false;
  index: number;
  tracks$ = new BehaviorSubject<any>(sampleTracks);
  siteTitle;
  private queueIndexer = 0;
  private queueArr = [];
  private interval: any;

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService,
    private titleService: Title
  ) {}

  initTracks(tracks: Track[]): void {
    this.queueArr = [];

    this.looper(this.queueIndexer, tracks);
    this.interval = setInterval(() => {
      this.looper(this.queueIndexer + 1, tracks);
    }, 7000);
    this.playerService.init(tracks);
  }

  private looper(index, tracks) {
    for (let i = index; i < tracks.length; i++) {
      this.deezer.getTrack(tracks[i].id).subscribe(t => {
        this.queueArr.push(t);
        if (this.queueArr.length >= tracks.length) {
          this.queueIndexer = 0;
          this.tracks$.next(this.queueArr);
          clearInterval(this.interval);
        }
      });
      this.queueIndexer = i;
      if (i != 0 && i % 48 == 0) {
        break;
      }
    }
  }

  play() {
    this.isPlaying = true;
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

  next() {
    this.stop();
    this.tracks$.subscribe(t => {
      this.siteTitle = t[this.playerService.index + 1].title_short;
      this.titleService.setTitle(this.siteTitle);
    });
    this.playerService.playNext();
  }

  previous() {
    this.stop();
    this.playerService.playPrevious();
  }

  playing(playing) {
    this.isPlaying = playing;
  }

  onEnd() {
    this.next();
  }

  start(album) {
    if (this.isPlaying) this.stop();

    this.deezer.getTrackList(album.tracklist).subscribe((tracks: Track[]) => {
      this.initTracks(tracks);
      this.playerService.index = 0;
      this.play();
      this.titleService.setTitle(tracks[0].title_short);
    });
  }

  startWithLoadedTracks(album) {
    if (this.isPlaying) this.stop();

    const tracks = album.tracks.data;
    this.initTracks(tracks);
    this.playerService.index = 0;
    this.play();
    this.titleService.setTitle(tracks[0].title_short);
  }

  startSelectedTrack(tracks, trackIndex) {
    if (this.isPlaying) this.stop();

    this.initTracks(tracks);
    this.playerService.playNew(trackIndex);
    this.titleService.setTitle(tracks[trackIndex].title_short);
    this.isPlaying = true;
  }
}
