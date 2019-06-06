import * as fromCurrentlyPlaying from "../../../shared/components/state/currently-playing/currently-playing.reducer";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "ws-currently-playing",
  templateUrl: "./currently-playing.component.html",
  styleUrls: ["./currently-playing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentlyPlayingComponent implements OnInit {
  currentlyPlayingTrack$: any;
  album$: any;

  constructor(
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.currentlyPlayingTrack$ = this.store.pipe(
      select(fromCurrentlyPlaying.getCurrentlyPlayingTrack)
    );

    this.album$ = this.store.pipe(
      select(fromCurrentlyPlaying.getPlayingAlbum)
    );
  }
}
