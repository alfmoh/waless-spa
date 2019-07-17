import * as fromRoot from "src/app/state/app.state";
import * as fromPlaylist from "src/app/core/components/state/playlist/playlist.reducer";
import * as fromQueueAction from "src/app/core/components/state/queue/queue.actions";
import { Component, OnInit, Input } from "@angular/core";
import { NgbPopover, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Track } from "../../models/Track";
import { AddPlaylistComponent } from "../addPlaylist/addPlaylist.component";
import { Playlist } from "../../models/Playlist";
import { WalessService } from "../../services/waless.service";
import { albumCaster } from "../../helpers/caster";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "ws-track-ellipsis",
  templateUrl: "./track-ellipsis.component.html",
  styleUrls: ["./track-ellipsis.component.scss"]
})
export class TrackEllipsisComponent implements OnInit {
  @Input("src") src: any;
  @Input("track") track;
  @Input("isArtist") isArtist: boolean;

  currentQueue$: Observable<Track[]>;
  playlists$: Observable<Playlist[]>;

  constructor(
    private modalService: NgbModal,
    private walessService: WalessService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.playlists$ = this.store.pipe(select(fromPlaylist.getPlaylists));
  }

  onListItemClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

  open(track: Track, event: any, element: NgbPopover) {
    this.onListItemClick(event, element);
    const modalRef = this.modalService.open(AddPlaylistComponent);
    this.addTrackAlbum(track);
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
    this.addTrackAlbum(track);
    this.addToPlaylist(playlist.playlistId, track);
  }

  addToPlaylist(playlistId: number, track: any) {
    this.walessService.addToPlaylist(playlistId, track).subscribe();
  }

  onPlayNext(event: any, element: NgbPopover) {
    this.onListItemClick(event, element);
    this.store.dispatch(
      new fromQueueAction.PlayNext({
        track: this.track,
        album: this.src
      })
    );
  }

  private addTrackAlbum(track: any) {
    const albumCast = albumCaster(this.src);
    if (!track.album) track.album = albumCast;
  }
}
