import { AlertifyService } from "./../../../shared/services/Alertify.service";
import * as fromShared from "./../../../shared/state/shared.reducer";
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

  constructor(
    private route: ActivatedRoute,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService,
    private title: Title,
    private store: Store<fromShared.SharedState>,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(fromShared.getCurrentlyPlaying),
        takeWhile(() => this.componentActive)
      )
      .subscribe(siteTitle => this.title.setTitle(siteTitle));

    this.albumId = +this.route.snapshot.paramMap.get("id");

    this.store.dispatch(new fromAlbumAction.LoadAlbum(this.albumId));

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
        if (e)
          this.alertify.error("Sorry. An error occured while loading tracks.");
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
