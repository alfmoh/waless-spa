import { PlayerService } from './../../../core/services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ws-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  trackUrl = "https://cdns-preview-0.dzcdn.net/stream/c-0f467d7d96e76631edd1058c38464364-3.mp3";

  constructor(private player: PlayerService) { }

  ngOnInit() {
  }

  play() {
    console.log("Playing...")
    this.player.init(this.trackUrl);
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

}
