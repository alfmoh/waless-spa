import { PlayerService } from "./../../../core/services/player.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ws-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  constructor(private player: PlayerService) {}

  ngOnInit() {}

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
}
