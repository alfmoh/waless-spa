import { ActivatedRoute } from "@angular/router";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Title } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "app-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent implements OnInit {
  tracks;
  subOnEnd: any;
  subPlaying: any;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.tracks = this.playerHandler.queueArr;

    this.store
      .pipe(select("currently-playing"))
      .subscribe((currentlyPlaying: any) => {
        if (currentlyPlaying) this.title.setTitle(currentlyPlaying.siteTitle);
      });

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
  }
}
