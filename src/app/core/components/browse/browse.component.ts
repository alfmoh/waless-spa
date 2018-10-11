import { AlertifyService } from "./../../../shared/services/Alertify.service";
import { Title } from "@angular/platform-browser";
import { PlayerService } from "./../../services/player.service";
import { Album } from "./../../../shared/models/Album";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { Store, select } from "@ngrx/store";
import * as fromShared from "../../../shared/state/shared.reducer";
import * as fromCore from "../../state/core.reducer";
import * as fromCoreAction from "../../state/core.actions";
import { takeWhile } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "ws-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"]
})
export class BrowseComponent implements OnInit, OnDestroy {
  albums$: Observable<Album[]>;
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromCore.CoreState | fromShared.SharedState>,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromCoreAction.LoadBrowse());

    this.albums$ = this.store.pipe(select(fromCore.getBrowseChartAlbums));

    this.store
      .pipe(
        select(fromShared.getCurrentlyPlaying),
        takeWhile(() => this.componentActive)
      )
      .subscribe(siteTitle => this.title.setTitle(siteTitle));

    this.store
      .pipe(
        select(fromCore.getBrowseError),
        takeWhile(() => this.componentActive)
      )
      .subscribe(() =>
        this.alertify.error("Couldn't load tracks. Please try again.")
      );

    let event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
    );
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.componentActive = false;
  }
}
