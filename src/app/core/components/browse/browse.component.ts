import { Album } from "./../../../shared/models/Album";
import { Track } from "./../../../shared/models/Track";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ws-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"]
})
export class BrowseComponent implements OnInit {
  albums: Album[];

  constructor(private deezer: DeezerService) {}

  ngOnInit() {
    this.deezer.getAlbumns().subscribe((response: Album[]) => (this.albums = response));
  }
}
