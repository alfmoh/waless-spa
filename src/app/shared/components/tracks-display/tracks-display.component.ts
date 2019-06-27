import { PlayerHanlder } from "./../../helpers/playerhandler";
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";
import { Track } from "../../models/Track";
import { NgbPopover, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Playlist } from "../../models/Playlist";
import { albumCaster } from "../../helpers/caster";
import { AddPlaylistComponent } from "../addPlaylist/addPlaylist.component";
import { AlertifyService } from "../../services/Alertify.service";

@Component({
  selector: "ws-tracks-display",
  templateUrl: "./tracks-display.component.html",
  styleUrls: ["./tracks-display.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracksDisplayComponent implements OnInit {
  @Input("isLoaded") isLoaded: boolean;
  @Input("isError") isError: boolean;
  @Input("src") src: any;
  @Input("trackList") trackList: Track[];
  @Input("playlists") playlists: Playlist[];

  @Output("addToPlaylist") addToPlaylist = new EventEmitter<any>();
  @Output("deletePlaylist") deletePlaylist = new EventEmitter<any>();

  constructor(
    public playerHandler: PlayerHanlder,
    private modalService: NgbModal,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

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
    this.addTrackAlbum(track);
    this.addToPlaylist.emit({ track, playlist });
  }

  open(track: Track) {
    const modalRef = this.modalService.open(AddPlaylistComponent);
    this.addTrackAlbum(track);
    modalRef.componentInstance.track = track;
  }

  onDeletePlaylist(playlistId: number) {
    this.alertify.confirm(
      "Confirm",
      "Are you sure you want to delete this playlist?",
      () => this.deletePlaylist.emit(playlistId)
    );
  }

  private addTrackAlbum(track: any) {
    const albumCast = albumCaster(this.src);
    if (!track.album) track.album = albumCast;
  }
}
