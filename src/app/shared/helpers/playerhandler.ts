import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  isPlaying: boolean = false;
  tracks: any;
  index: number;

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService
  ) { }

  initTracks(tracks): void {
    this.tracks = tracks;
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
        this.play();
      });
  }
}
