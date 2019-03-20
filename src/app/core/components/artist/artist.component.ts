import * as fromShared from "./../../../shared/state/shared.reducer";
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

  artistDesc = lorem;
  subOnEnd: any;
  subPlaying: any;
  componentActive = true;

  constructor(
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService,
    private title: Title,
    private store: Store<fromShared.SharedState>
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");

    this.store.dispatch(
      new fromArtistAction.LoadArtistAndTopTracks(this.artistId)
    );

    this.store
      .pipe(
        select(fromArtist.getArtist),
        takeWhile(() => this.componentActive)
      )
      .subscribe(artist => (this.artist = artist));

    this.store
      .pipe(
        select(fromArtist.getArtistTopTracks),
        takeWhile(() => this.componentActive)
      )
      .subscribe(topTracks => {
        this.artistAlbums = topTracks.map(track => track.album).slice(0, 8);
        return (this.topTracks = topTracks.slice(0, 10));
      });

    const event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(() =>
      this.playerHandler.isPlaying()
    );

    this.store
      .pipe(
        select(fromShared.getCurrentlyPlaying),
        takeWhile(() => this.componentActive)
      )
      .subscribe(siteTitle => this.title.setTitle(siteTitle));
  }

  openDialog() {
    this.alertify.alert("Biography", this.artistDesc);
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
    this.componentActive = false;
  }
}
