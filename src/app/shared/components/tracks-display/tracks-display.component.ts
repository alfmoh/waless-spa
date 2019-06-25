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
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { Playlist } from "../../models/Playlist";
import { albumCaster } from "../../helpers/caster";

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

  constructor(public playerHandler: PlayerHanlder) {}

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
    if (!track.album) {
      const albumCast = albumCaster(this.src);
      track.album = albumCast;
    }
    this.addToPlaylist.emit({ track, playlist });
  }
}
