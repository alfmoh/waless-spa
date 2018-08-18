import { ActivatedRoute } from "@angular/router";
import { Track } from "./../../../shared/models/Track";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Title } from "@angular/platform-browser";

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
    public playerHandler: PlayerHanlder,
    private title: Title,
    private route: ActivatedRoute
  ) {
    this.subTrack = this.playerHandler.tracks$.subscribe(tracks => {
      if (!this.selectedTrack) this.selectedTrack = tracks[0];
      this.tracks = tracks;
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: { siteTitle: string }) =>
      this.title.setTitle(data.siteTitle)
    );

    let event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
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
    this.playerHandler.startSelectedTrack(tracks, index);
  }
}
