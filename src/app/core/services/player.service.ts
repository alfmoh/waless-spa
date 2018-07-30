import { Injectable } from '@angular/core';
import { Howl } from "howler";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  track: Howl;

  constructor() { }

  init(src: string) {
    this.track = new Howl({ src, preload: true })
  }

  play() { this.track.play(); }

  pause() { this.track.pause(); }

  stop() { this.track.stop(); }

}
