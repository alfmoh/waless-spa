import { Track } from "./../../../shared/models/Track";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"]
})
export class QueueComponent implements OnInit {
  tracks;
  selectedTrack: Track;
  subOnEnd: any;
  subPlaying: any;
  subTrack: any;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder
  ) {
    this.subTrack = this.playerHandler.tracks$.subscribe(tracks => {
      this.selectedTrack = tracks[0];
      this.tracks = tracks;
    });
  }

  ngOnInit() {
    let event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(event$ =>
      this.playerHandler.playing(event$)
    );
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.subTrack.unsubscribe();
  }

  startTrack(tracks: Track[], index) {
    this.selectedTrack = tracks[index];
    if (this.playerHandler.isPlaying) this.playerHandler.stop();
    this.playerHandler.startSelectedTrack(tracks, index);
  }
}
