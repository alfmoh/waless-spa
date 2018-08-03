import { DeezerService } from "./../../../shared/services/deezer.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Artist } from "../../../shared/models/Artist";
import { Track } from "../../../shared/models/Track";
import { Album } from "../../../shared/models/Album";
import { AlertifyService } from "../../../shared/services/Alertify.service";

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

  artistDesc = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Recusandae animi eaque hic autem repellat repudiandae,
  sapiente provident voluptatum cum tempora assumenda eligendi numquam.
  Cum, corporis consequuntur. Quo sit hic voluptatum.
  Etiam sed fermentum magna. Pellentesque dictum tristique felis a mattis.
  Phasellus faucibus enim turpis, vel tincidunt sem sagittis eu.
  Donec ante odio, facilisis nec lobortis in, auctor vel lectus.
  In maximus tincidunt quam, eget aliquet ipsum fringilla in.
  Etiam ut augue lectus. Vestibulum sapien lectus, consequat sagittis sem sed, tristique interdum ex.
  Vivamus vel egestas purus. Interdum et malesuada fames ac ante ipsum primis in faucibus.`;

  constructor(
    private alertify: AlertifyService,
    private deezer: DeezerService,
    private route: ActivatedRoute) {}

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

  openDialog(){
    this.alertify.alert("Artist Description", this.artistDesc);
  }
}
