import { PlayerService } from "./../../services/player.service";
import { Album } from "./../../../shared/models/Album";
import { Track } from "./../../../shared/models/Track";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";

@Component({
  selector: "ws-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"]
})
export class BrowseComponent implements OnInit, OnDestroy {
  albums: Album[];
  subOnEnd: any;
  subPlaying: any;

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

  ngOnDestroy(){
    this.subOnEnd.unsubscribe();
    this.subPlaying.unsubscribe();
  }
}
