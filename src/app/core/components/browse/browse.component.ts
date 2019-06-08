import { AlertifyService } from "./../../../shared/services/Alertify.service";
import * as fromRoot from "./../../../state/app.state";
import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import * as fromBrowse from "../../../core/components/state/browse/browse.reducer";
import { Title } from "@angular/platform-browser";
import { PlayerService } from "./../../services/player.service";
import { Album } from "./../../../shared/models/Album";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { Store, select } from "@ngrx/store";
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
  isLoaded: boolean;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromRoot.State>,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromCoreAction.LoadBrowse());

    this.albums$ = this.store.pipe(select(fromBrowse.getBrowseChartAlbums));

    this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track => this.title.setTitle(this.playerService.getSiteTitle(track)));

      this.store
      .pipe(
        select(fromBrowse.getBrowseIsLoaded),
        takeWhile(() => this.componentActive)
      )
      .subscribe(isLoaded => (this.isLoaded = isLoaded));

    this.store
      .pipe(
        select(fromBrowse.getBrowseError),
        takeWhile(() => this.componentActive)
      )
      .subscribe(e => {
        if (e) this.alertify.error("Sorry. An error occured while loading tracks. Please refresh.");
      });

    const event = this.playerService.playerEvents;
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
