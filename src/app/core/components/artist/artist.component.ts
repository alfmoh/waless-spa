import { DeezerService } from './../../../shared/services/deezer.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Artist } from "../../../shared/models/Artist";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistId: any;
  artist:Artist;
  artistpic: string;

  constructor(
    private deezer: DeezerService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");
    if(this.artistId)
      this.deezer.getArtist(this.artistId).subscribe(
        artist => this.artist = artist
      );
  }

}
