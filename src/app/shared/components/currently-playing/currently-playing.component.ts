import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import { PlayerHanlder } from "./../../helpers/playerhandler";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { PlayerService } from "../../../core/services/player.service";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "ws-currently-playing",
  templateUrl: "./currently-playing.component.html",
  styleUrls: ["./currently-playing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentlyPlayingComponent implements OnInit {
  // get currentPlay$() {
  //   return this.playerService.currentTrack$;
  // }
  currentlyPlayingTrack$: any;

  constructor(
    private playerService: PlayerService,
    private playerHandler: PlayerHanlder,
    private store: Store<any>
  ) {
    this.playerService.currentTrack$.next(
      this.playerHandler.queueArr[this.playerService.index]
    );
  }

  ngOnInit() {
    this.currentlyPlayingTrack$ = this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack)
      );
  }
}
