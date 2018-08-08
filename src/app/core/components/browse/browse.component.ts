import { PlayerService } from "./../../services/player.service";
import { Album } from "./../../../shared/models/Album";
import { Track } from "./../../../shared/models/Track";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";

@Component({
  selector: "ws-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"]
})
export class BrowseComponent implements OnInit {
  albums: Album[];

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService,
    public playerHandler: PlayerHanlder
  ) {}

  ngOnInit() {
    this.deezer
      .getAlbumns()
      .subscribe((response: Album[]) => (this.albums = response));

    let event = this.playerService.playerEvents;
    event.onEnd$.subscribe(() => this.playerHandler.onEnd());
    event.playing$.subscribe(event$ => this.playerHandler.playing(event$));
  }

  start(album) {
    this.deezer.getTrackList(album.tracklist).subscribe((tracks: Track[]) => {
      this.playerHandler.initTracks(tracks);
      this.playerHandler.play();
    });
  }
}
