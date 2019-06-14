import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";

@Component({
  selector: "ws-browse-item",
  templateUrl: "./browse-item.component.html",
  styleUrls: ["./browse-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseItemComponent implements OnInit {
  @Input("isLoaded") isLoaded: boolean;
  @Input("items") items: any;
  @Input("caroActive") caroActive: boolean;

  constructor(public playerHandler: PlayerHanlder) {}

  ngOnInit() {}
}
