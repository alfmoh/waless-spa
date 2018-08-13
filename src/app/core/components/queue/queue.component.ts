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
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.subTrack.unsubscribe();
  }

  play(track: Track) {
    this.selectedTrack = track;
  }
}
