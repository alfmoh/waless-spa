import { Router } from "@angular/router";
import { PlayerService } from "./../../../core/services/player.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "ws-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  constructor(
    private player: PlayerService,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {}

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
}
