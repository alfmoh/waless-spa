import { BehaviorSubject, forkJoin } from 'rxjs';
import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";
import { sampleTracks } from "../temp/_lorem";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  isPlaying: boolean = false;
  index: number;
  tracks$ = new BehaviorSubject<any>(sampleTracks);

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService
  ) { }

  initTracks(tracks: Track[]): void {

    let obsArr = tracks.map(track => this.deezer.getTrack(track.id));
    forkJoin(...obsArr).subscribe(trackArr => {
      this.tracks$.next(trackArr);
    })

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
    this.playerService.playNext();
  }

  previous() {
    this.playerService.playPrevious();
  }

  playing(playing) {
    this.isPlaying = playing;
  }

  onEnd() {
    this.playerService.playNext();
  }

  start(album) {
    if (this.isPlaying) this.stop();
    this.deezer.getTrackList(album.tracklist)
      .subscribe((tracks: Track[]) => {
        this.initTracks(tracks);
        this.playerService.index = 0;
        this.play();
      });
  }

  startSelectedTrack(tracks,trackIndex) {
    if (this.isPlaying) this.stop();

    this.initTracks(tracks);
    this.playerService.playNew(trackIndex);
    this.isPlaying = true;
  }
}
