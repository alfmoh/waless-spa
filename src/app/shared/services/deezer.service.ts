import { map } from "rxjs/operators";
import { Track } from "./../models/Track";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SharedModule } from "../shared.module";
import { Album } from "../models/Album";

@Injectable({
  providedIn: "root"
})
export class DeezerService {
  baseUrl = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/";

  constructor(private http: HttpClient) {}

  getTracks(): Observable<Track[]> {
    return this.http
      .get<Track>(this.baseUrl + "chart")
      .pipe(map((response: any) => response.tracks.data));
  }

  getAlbumns(): Observable<Album[]> {
    return this.http
      .get<Album>(this.baseUrl + "chart")
      .pipe(map((response: any) => response.albums.data));
  }

  getAlbumTracks(albumId: number): Observable<Track[]> {
    return this.http
      .get<Track>(this.baseUrl + "album/" + albumId + "/tracks")
      .pipe(map((response: any) => response.data));
  }
}
