import { WalessService } from "src/app/shared/services/waless.service";
import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import * as fromRoot from "./../../../state/app.state";
import { PlayerService } from "./../../services/player.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Artist } from "../../../shared/models/Artist";
import { Track } from "../../../shared/models/Track";
import { Album } from "../../../shared/models/Album";
import { AlertifyService } from "../../../shared/services/Alertify.service";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { lorem } from "../../../shared/temp/_lorem";
import { Title } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";

import * as fromArtistAction from "../state/artist/artist.actions";
import * as fromArtist from "../state/artist/artist.reducer";
import * as fromPlaylistAction from "./../state/playlist/playlist.actions";
import * as fromPlaylist from "./../state/playlist/playlist.reducer";
import { artistBioTitle } from "src/app/shared/helpers/constants";
import { NgbPopover, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddPlaylistComponent } from "src/app/shared/components/addPlaylist/addPlaylist.component";
import { Playlist } from "src/app/shared/models/Playlist";
import { Observable } from "rxjs";

@Component({
  selector: "ws-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit, OnDestroy {
  artistId: any;
  artist: Artist;
  artistpic: string;
  topTracks: Track[];
  artistAlbums: Album[];
  playlists$: Observable<Playlist[]>;

  artistDesc = lorem;
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;
  isLoaded: boolean;
  isError: boolean;

  constructor(
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService,
    private title: Title,
    private modalService: NgbModal,
    private walessService: WalessService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");

    this.store.dispatch(
      new fromArtistAction.LoadArtistAndTopTracks(this.artistId)
    );

    this.store.dispatch(new fromPlaylistAction.LoadPlaylists());
    this.playlists$ = this.store.pipe(select(fromPlaylist.getPlaylists));

    this.store
      .pipe(
        select(fromArtist.getArtist),
        takeWhile(() => this.componentActive)
      )
      .subscribe(artist => (this.artist = artist));

    this.store
      .pipe(
        select(fromArtist.getArtistIsLoaded),
        takeWhile(() => this.componentActive)
      )
      .subscribe(isLoaded => (this.isLoaded = isLoaded));

    this.store
      .pipe(
        select(fromArtist.getArtistTopTracks),
        takeWhile(() => this.componentActive)
      )
      .subscribe(topTracks => {
        this.artistAlbums = topTracks.map(track => track.album).slice(0, 8);
        return (this.topTracks = topTracks.slice(0, 10));
      });

    this.store
      .pipe(
        select(fromArtist.getArtistError),
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

    this.store
      .pipe(
        select(fromCurrentlyPlaying.getCurrentlyPlayingTrack),
        takeWhile(() => this.componentActive)
      )
      .subscribe(track =>
        this.title.setTitle(this.playerService.getSiteTitle(track))
      );
  }

  openDialog() {
    this.alertify.alert(artistBioTitle, this.artistDesc);
  }

  onEllipsisClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

  open(track: Track) {
    const modalRef = this.modalService.open(AddPlaylistComponent);
    modalRef.componentInstance.track = track;
  }

  onAddToPlaylistClick(
    event: any,
    element: NgbPopover,
    track: any,
    playlist: Playlist
  ) {
    event.stopPropagation();
    element.toggle();
    this.onAddToPlaylist(playlist.playlistId, track);
  }

  onAddToPlaylist(playlistId: number, track: any) {
    this.walessService.addToPlaylist(playlistId, track).subscribe();
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.componentActive = false;
  }
}
