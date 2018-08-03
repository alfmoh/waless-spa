import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Artist } from "../../../shared/models/Artist";
import { Track } from "../../../shared/models/Track";
import { Album } from "../../../shared/models/Album";

@Component({
  selector: "ws-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit {
  artistId: any;
  artist: Artist;
  artistpic: string;
  topTracks: Track[];
  artistAlbums: Album[];

  constructor(private deezer: DeezerService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");
    if (this.artistId) {
      this.deezer
        .getArtist(this.artistId)
        .subscribe(artist => (this.artist = artist));
      this.deezer.getArtistTopTracks(this.artistId).subscribe(topTracks => {
        this.artistAlbums = topTracks.map(track => track.album).slice(0, 5);
        return (this.topTracks = topTracks.slice(0, 10));
      });
    }
  }
}
