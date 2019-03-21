import * as fromShared from "./../../../shared/state/shared.reducer";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Title } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent implements OnInit, OnDestroy {
  tracks;
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromShared.SharedState>
  ) {}

  ngOnInit() {
    this.tracks = this.playerHandler.queueArr;

    this.store
      .pipe(
        select(fromShared.getCurrentlyPlaying),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track => this.title.setTitle(this.playerService.getSiteTitle(track)));

    const event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
    );
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.componentActive = false;
  }
}
