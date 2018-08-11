import { PlayerHanlder } from "./../../../shared/helpers/playerhandler";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"]
})
export class QueueComponent implements OnInit {
  tracks$;
  constructor(private playerHanlder: PlayerHanlder) {
    this.tracks$ = this.playerHanlder.tracks$;
  }

  ngOnInit() {}
}
