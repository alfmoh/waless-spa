import { DeezerService } from "./../../shared/services/deezer.service";
import { Injectable } from "@angular/core";
import { Howl } from "howler";
import { Track } from "../../shared/models/Track";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  track: Howl;
  tracks: Howl[];
  index = 0;

  constructor(private deezer: DeezerService) {}

  getAlbumTracks(albumId: number) {
    this.deezer.getAlbumTracks(albumId).subscribe((tracks: Track[]) => {
      const playlist = tracks.map(track => {
        return new Howl({ src: track.preview });
      });
      this.tracks = playlist;
    });
    this.play();
  }

  play() {
    this.track = this.tracks[this.index];
    this.track.play();
    this.track.on("end", () => {
      this.index++;
      if (this.index != this.tracks.length) this.play();
      if (this.index == this.tracks.length) {
        this.index = 0;
        this.tracks = [];
        return;
      }
    });
  }

  pause() {
    this.track.pause();
  }

  stop() {
    this.track.stop();
  }
}
