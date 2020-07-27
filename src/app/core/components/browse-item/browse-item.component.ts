import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import { PlayerHanlder } from "../../../shared/helpers/playerhandler";
import { DragScrollComponent } from "ngx-drag-scroll";

@Component({
  selector: "ws-browse-item",
  templateUrl: "./browse-item.component.html",
  styleUrls: ["./browse-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseItemComponent implements OnInit {
  @Input("isLoaded") isLoaded: boolean;
  @Input("items") items: any;
  @Input("caroActive") caroActive: boolean;
  @ViewChild("dragParent", { read: DragScrollComponent })
  ds: DragScrollComponent;

  constructor(public playerHandler: PlayerHanlder) {}

  ngOnInit() {}

  artistMoveLeft() {
    this.ds.moveLeft();
  }

  artistMoveRight() {
    this.ds.moveRight();
  }
}
