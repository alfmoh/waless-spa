import * as fromPlaylist from "./../../../core/components/state/playlist/playlist.reducer";
import * as fromPlaylistAction from "./../../../core/components/state/playlist/playlist.actions";
import * as fromRoot from "./../../../state/app.state";
import { PlayerHanlder } from "./../../helpers/playerhandler";
import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Track } from "../../models/Track";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Playlist } from "../../models/Playlist";
import { WalessService } from "../../services/waless.service";

@Component({
  selector: "ws-tracks-display",
  templateUrl: "./tracks-display.component.html",
  styleUrls: ["./tracks-display.component.scss"]
})
export class TracksDisplayComponent implements OnInit {
  @Input("isLoaded") isLoaded: boolean;
  @Input("isError") isError: boolean;
  @Input("src") src: any;
  @Input("trackList") trackList: Track[];

  playlists$: Observable<Playlist[]>;

  constructor(
    public playerHandler: PlayerHanlder,
    private walessService: WalessService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromPlaylistAction.LoadPlaylists());
    this.playlists$ = this.store.pipe(select(fromPlaylist.getPlaylists));
  }

  onEllipsisClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

  onAddToPlaylistClick(
    event: any,
    element: NgbPopover,
    track: any,
    playlist: Playlist
  ) {
    event.stopPropagation();
    element.toggle();
    if (!track.album) {
      const srcCopy = { ...this.src };
      track.album = srcCopy;
    }
    this.walessService.addToPlaylist(playlist.playlistId, track).subscribe();
  }
}
