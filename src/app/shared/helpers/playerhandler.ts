import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  isPlaying: boolean = false;
  tracks: any;
  index: number;

  constructor(private playerService: PlayerService) {}

  initTracks(tracks): void {
    this.tracks = tracks;
    this.playerService.init(tracks);
  }

  play() {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    if (this.isPlaying) this.playerService.stop();
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
    this.index += 1;
  }
}
