import { PlayerHanlder } from "./../../helpers/playerhandler";
import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Track } from "../../models/Track";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

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

  constructor(public playerHandler: PlayerHanlder) { }

  ngOnInit() {
  }

  onPopClick(event: any, element: NgbPopover) {
    event.stopPropagation();
    element.toggle();
  }

}
