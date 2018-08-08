import { Album } from "./../../../shared/models/Album";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Track } from "../../../shared/models/Track";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { PlayerService } from "../../services/player.service";

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

  constructor(
    private route: ActivatedRoute,
    private deezer: DeezerService,
    public playerHandler: PlayerHanlder,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.albumId = +this.route.snapshot.paramMap.get("id");
    if (this.albumId) {
      this.deezer.getAlbum(this.albumId).subscribe((album: any) => {
        this.albumTracks = album.tracks.data;
        return (this.album = album);
      });
    }

    let event = this.playerService.playerEvents;
    this.subOnEnd = event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    this.subPlaying = event.playing$.subscribe(event$ => this.playerHandler.playing(event$));
  }

  start(album) {
    if(this.playerHandler.isPlaying) this.playerHandler.stop();
    this.deezer.getTrackList(album.tracklist).subscribe((tracks: Track[]) => {
      this.playerHandler.initTracks(tracks);
      this.playerHandler.play();
    });
  }

  ngOnDestroy() {
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
  }
}
