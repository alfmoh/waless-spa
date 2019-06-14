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
import { Playlist } from "src/app/shared/models/Playlist";
import { Artist } from "src/app/shared/models/Artist";

@Component({
  selector: "ws-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"]
})
export class BrowseComponent implements OnInit, OnDestroy {
  albums$: Observable<Album[]>;
  playlists$: Observable<Playlist[]>;
  artists$: Observable<Artist[]>;
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;
  isLoaded: boolean;
  isError: boolean;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromRoot.State>  ) {}

  ngOnInit() {
    this.store.dispatch(new fromCoreAction.LoadBrowse());

    this.albums$ = this.store.pipe(select(fromBrowse.getBrowseChartAlbums));
    this.playlists$ = this.store.pipe(
      select(fromBrowse.getBrowseChartPlaylists)
    );
    this.artists$ = this.store.pipe(select(fromBrowse.getBrowseChartArtists));

    this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track =>
        this.title.setTitle(this.playerService.getSiteTitle(track))
      );

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
        if (e) this.isError = true;
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
