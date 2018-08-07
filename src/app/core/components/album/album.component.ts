import { Album } from "./../../../shared/models/Album";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Track } from "../../../shared/models/Track";

@Component({
  selector: "ws-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"]
})
export class AlbumComponent implements OnInit {
  albumId: number;
  album: Album;
  albumTracks: Track[];

  constructor(private route: ActivatedRoute, private deezer: DeezerService) {}

  ngOnInit() {
    this.albumId = +this.route.snapshot.paramMap.get("id");
    if (this.albumId) {
      this.deezer.getAlbum(this.albumId).subscribe((album: any) => {
        this.albumTracks = album.tracks.data;
        return (this.album = album);
      });
    }
  }
}
