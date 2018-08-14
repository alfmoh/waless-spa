import { BehaviorSubject, forkJoin } from "rxjs";
import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";
import { sampleTracks } from "../temp/_lorem";
import { take, pairwise } from "rxjs/operators";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  isPlaying: boolean = false;
  index: number;
  tracks$ = new BehaviorSubject<any>(sampleTracks);
  siteTitle;

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService,
    private titleService: Title
  ) { }

  initTracks(tracks: Track[]): void {
    let obsArr = tracks.map(track => this.deezer.getTrack(track.id));
    forkJoin(...obsArr).subscribe(trackArr => {
      this.tracks$.next(trackArr);
    });
    this.tracks$
      .pipe(
        take(2),
        pairwise()
      )
      .subscribe(t => {
        this.siteTitle = t[1][this.playerService.index].title_short
        this.titleService.setTitle(this.siteTitle)
      }
      );
    this.playerService.init(tracks);
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
      this.siteTitle = t[this.playerService.index + 1].title_short
      this.titleService.setTitle(this.siteTitle)
    }
    );
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
    });
  }

  startSelectedTrack(tracks, trackIndex) {
    if (this.isPlaying) this.stop();

    this.initTracks(tracks);
    this.playerService.playNew(trackIndex);
    this.isPlaying = true;
  }
}
