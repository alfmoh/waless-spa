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

  @Output("addToPlaylist") addToPlaylist = new EventEmitter<any>();
  @Output("deletePlaylist") deletePlaylist = new EventEmitter<any>();

  constructor(
    public playerHandler: PlayerHanlder,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  onListItemClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

  onDeletePlaylist(playlistId: number) {
    this.alertify.confirm(
      "Confirm",
      "Are you sure you want to delete this playlist?",
      () => this.deletePlaylist.emit(playlistId)
    );
  }
}
