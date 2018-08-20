import { PlayerHanlder } from "./../../helpers/playerhandler";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { PlayerService } from "../../../core/services/player.service";

@Component({
  selector: "ws-currently-playing",
  templateUrl: "./currently-playing.component.html",
  styleUrls: ["./currently-playing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentlyPlayingComponent implements OnInit {
  get currentPlay() {
    return this.playerService.currentTrack$;
  }
  constructor(
    private playerService: PlayerService,
    private playerHandler: PlayerHanlder
  ) {
    this.playerService.currentTrack$.next(
      this.playerHandler.queueArr[this.playerService.index]
    );
  }

  ngOnInit() {}
}
