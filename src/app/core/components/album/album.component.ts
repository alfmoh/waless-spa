import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import * as fromRoot from "./../../../state/app.state";
import { Album } from "./../../../shared/models/Album";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Track } from "../../../shared/models/Track";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { PlayerService } from "../../services/player.service";
import { Title } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";
import * as fromAlbumAction from "../state/album/album.actions";
import * as fromAlbum from "../state/album/album.reducer";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { WalessService } from "src/app/shared/services/waless.service";
import * as fromPlaylistAction from "./../state/playlist/playlist.actions";

@Component({
  selector: "ws-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"]
})
export class AlbumComponent implements OnInit, OnDestroy {
  albumId: number;
  album: Album;
  albumTracks: Track[];
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;
  album$: any;
  isLoaded: boolean;
  isError: boolean;

  constructor(
    private route: ActivatedRoute,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService,
    private title: Title,
    private walessService: WalessService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track =>
        this.title.setTitle(this.playerService.getSiteTitle(track))
      );

    this.albumId = +this.route.snapshot.paramMap.get("id");

    this.store.dispatch(new fromAlbumAction.LoadAlbum(this.albumId));
    this.store.dispatch(new fromPlaylistAction.LoadPlaylists());

    this.store
      .pipe(
        select(fromAlbum.getAlbum),
        takeWhile(() => this.componentActive)
      )
      .subscribe((album: any) => {
        if (album) {
          this.albumTracks = album.tracks.data.filter(track => track.readable);
          return (this.album = album);
        }
      });

    this.store
      .pipe(
        select(fromAlbum.getAlbumIsLoaded),
        takeWhile(() => this.componentActive)
      )
      .subscribe(isLoaded => (this.isLoaded = isLoaded));

    this.store
      .pipe(
        select(fromAlbum.getAlbumError),
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

  onPopClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

  onAddToPlaylist(values: any) {
    this.walessService
      .addToPlaylist(values.playlist.playlistId, values.track)
      .subscribe();
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.componentActive = false;
  }
}
