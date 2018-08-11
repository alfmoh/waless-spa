import { PlayerService } from "./../../services/player.service";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Artist } from "../../../shared/models/Artist";
import { Track } from "../../../shared/models/Track";
import { Album } from "../../../shared/models/Album";
import { AlertifyService } from "../../../shared/services/Alertify.service";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { lorem } from "../../../shared/temp/_lorem";

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

  constructor(
    private alertify: AlertifyService,
    private deezer: DeezerService,
    private route: ActivatedRoute,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");
    if (this.artistId) {
      this.deezer
        .getArtist(this.artistId)
        .subscribe(artist => (this.artist = artist));
      this.deezer.getArtistTopTracks(this.artistId).subscribe(topTracks => {
        this.artistAlbums = topTracks.map(track => track.album).slice(0, 8);
        return (this.topTracks = topTracks.slice(0, 10));
      });
    }

    let event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(event$ =>
      this.playerHandler.playing(event$)
    );
  }

  openDialog() {
    this.alertify.alert("Biography", this.artistDesc);
  }

  startTrack(albumTracks, index) {
    if (this.playerHandler.isPlaying) this.playerHandler.stop();
    this.playerHandler.startSelectedTrack(albumTracks, index);
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
  }
}
