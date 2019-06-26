import * as fromPlaylistAction from "src/app/core/components/state/playlist/playlist.actions";
import * as fromRoot from "./../../../state/app.state";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { Track } from "../../models/Track";

@Component({
  selector: "ws-add-playlist",
  templateUrl: "./addPlaylist.component.html",
  styleUrls: ["./addPlaylist.component.scss"]
})
export class AddPlaylistComponent implements OnInit {
  playlistTitle: string;
  track: Track;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {}

  onSubmit(formValue) {
    const value = formValue.value;
    if (this.track) value.tracks = [this.track];
    this.store.dispatch(new fromPlaylistAction.CreatePlaylist(value));
    this.activeModal.close();
  }
}
