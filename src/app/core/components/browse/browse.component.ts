import { Title } from "@angular/platform-browser";
import { PlayerService } from "./../../services/player.service";
import { Album } from "./../../../shared/models/Album";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { Store, select } from "@ngrx/store";
import * as fromShared from "../../../shared/state/shared.reducer";

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
    public playerHandler: PlayerHanlder,
    private title: Title,
    private store: Store<fromShared.SharedState>
  ) {}

  ngOnInit() {
    this.deezer
      .getChartAlbums()
      .subscribe((response: Album[]) => (this.albums = response));

    this.store
      .pipe(select(fromShared.getCurrentlyPlaying))
      .subscribe(siteTitle => this.title.setTitle(siteTitle));

    let event = this.playerService.playerEvents;
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
