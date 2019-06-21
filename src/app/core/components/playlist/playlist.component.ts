import * as fromPlaylistAction from "./../state/playlist/playlist.actions";
import * as fromPlaylist from "./../state/playlist/playlist.reducer";
import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { PlayerService } from "./../../services/player.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "./../../../state/app.state";
import { Observable } from "rxjs";
import { Playlist } from "src/app/shared/models/Playlist";

@Component({
  selector: "ws-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.scss"]
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlists$: Observable<Playlist[]>;
  isLoaded$: Observable<boolean>;
  subOnEnd: any;
  subPlaying: any;

  constructor(
    private playerService: PlayerService,
    public playerHandler: PlayerHanlder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromPlaylistAction.LoadPlaylists());

    this.playlists$ = this.store.pipe(select(fromPlaylist.getPlaylists));
    this.isLoaded$ = this.store.pipe(select(fromPlaylist.getPlaylistIsLoaded));
    this.playlists$.subscribe(console.log);

    const event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
    );
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
  }
}
