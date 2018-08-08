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
    console.log("next()")
    this.playerService.playNext();
  }

  previous() {
    this.playerService.playPrevious();
  }

  playing(playing) {
    console.log(playing)
    this.isPlaying = playing;
  }

  onEnd() {
    this.playerService.playNext();
  }
}
