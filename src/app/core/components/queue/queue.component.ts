import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import * as fromQueue from "../../../core/components/state/queue/queue.reducer";
import * as fromRoot from "./../../../state/app.state";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Title } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "ws-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent implements OnInit, OnDestroy {
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;
  tracks$: any;
  isLoaded$: Observable<boolean>;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.tracks$ = this.store.pipe(select(fromQueue.getQueue));

    this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track =>
        this.title.setTitle(this.playerService.getSiteTitle(track))
      );

    this.isLoaded$ = this.store.pipe(select(fromQueue.getQueueIsLoaded));

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
