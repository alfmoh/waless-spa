import { Store, select } from "@ngrx/store";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";

@Component({
  selector: "ws-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  @Input()
  playing: boolean;
  @Output()
  play = new EventEmitter();
  @Output()
  pause = new EventEmitter();
  @Output()
  stop = new EventEmitter();
  @Output()
  previous = new EventEmitter();
  @Output()
  next = new EventEmitter();
  album$: any;
  currentlyPlayingTrack$: any;

  constructor(
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.currentlyPlayingTrack$ = this.store.pipe(
      select(fromCurrentlyPlaying.getCurrentlyPlayingTrack)
    );

    this.album$ = this.store.pipe(select(fromCurrentlyPlaying.getPlayingAlbum));
  }

  togglePlay(): void {
    if (this.playing) this.pause.emit(null);
    else this.play.emit(null);
  }

  toggleRoute() {
    this.router.url === "/queue"
      ? this.location.back()
      : this.router.navigateByUrl("/queue");
  }
}
