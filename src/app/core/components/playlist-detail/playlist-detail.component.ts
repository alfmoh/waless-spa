import { ActivatedRoute } from "@angular/router";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "./../../../state/app.state";
import * as fromPlaylistAction from "./../state/playlist/playlist.actions";
import * as fromPlaylist from "./../state/playlist/playlist.reducer";
import { Observable } from "rxjs";
import { Playlist } from "src/app/shared/models/Playlist";
import { WalessService } from "src/app/shared/services/waless.service";
import { Location } from "@angular/common";

@Component({
  selector: "ws-playlist-detail",
  templateUrl: "./playlist-detail.component.html",
  styleUrls: ["./playlist-detail.component.scss"]
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  subOnEnd: any;
  subPlaying: any;
  playlist$: Observable<any>;
  isLoaded$: Observable<boolean>;
  isError$: Observable<string>;
  playlistId: number;
  playlists$: Observable<Playlist[]>;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private walessService: WalessService,
    private location: Location  ) {}

  ngOnInit() {
    this.playlistId = +this.route.snapshot.paramMap.get("id");

    this.route.queryParams.subscribe(x =>
      this.store.dispatch(
        new fromPlaylistAction.LoadPlaylist([this.playlistId, x.source])
      )
    );

    this.store.dispatch(new fromPlaylistAction.LoadPlaylists());

    this.playlist$ = this.store.pipe(select(fromPlaylist.getPlaylist));
    this.isError$ = this.store.pipe(select(fromPlaylist.getPlaylistError));
    this.isLoaded$ = this.store.pipe(select(fromPlaylist.getPlaylistIsLoaded));
    this.playlists$ = this.store.pipe(select(fromPlaylist.getPlaylists));

    // TODO: Filter readable tracks

    const event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
    );
  }

  onAddToPlaylist(values: any) {
    this.walessService
      .addToPlaylist(values.playlist.playlistId, values.track)
      .subscribe();
  }

  onPlaylistDelete(playlistId: number) {
    this.store.dispatch(new fromPlaylistAction.DeletePlaylist(playlistId));
    this.location.back();
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
  }
}
