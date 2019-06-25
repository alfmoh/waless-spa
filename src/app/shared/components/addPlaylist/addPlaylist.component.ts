import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ws-add-playlist",
  templateUrl: "./addPlaylist.component.html",
  styleUrls: ["./addPlaylist.component.scss"]
})
export class AddPlaylistComponent implements OnInit {
  playlistTitle: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.playlistTitle);
    this.activeModal.close();
  }
}
