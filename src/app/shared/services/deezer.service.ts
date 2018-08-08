import { map } from "rxjs/operators";
import { Track } from "./../models/Track";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";

@Injectable({
  providedIn: "root"
})
export class DeezerService {
  baseUrl = "https://api.deezer.com/";
  jsonUrl = "output=jsonp&callback=JSONP_CALLBACK";

  constructor(private http: HttpClient) {}

  getTracks(): Observable<Track[]> {
    return this.http
      .jsonp(`${this.baseUrl}chart?${this.jsonUrl}`, "JSONP_CALLBACK")
      .pipe(map((response: any) => response.tracks.data));
  }

  getAlbumns(): Observable<Album[]> {
    return this.http
      .jsonp(`${this.baseUrl}chart?${this.jsonUrl}`, "JSONP_CALLBACK")
      .pipe(map((response: any) => response.albums.data));
  }

  getAlbumTracks(albumId: number): Observable<Track[]> {
    return this.http
      .jsonp(
        `${this.baseUrl}album/${albumId}/tracks?${this.jsonUrl}`,
        "JSONP_CALLBACK"
      )
      .pipe(map((response: any) => response.data));
  }

  getArtist(artistId: number): Observable<Artist> {
    return this.http.jsonp(
      `${this.baseUrl}artist/${artistId}?${this.jsonUrl}`,
      "JSONP_CALLBACK"
    ) as Observable<Artist>;
  }

  getArtistTopTracks(artistId: number): Observable<Track[]> {
    return this.http
      .jsonp(
        `${this.baseUrl}artist/${artistId}/top?limit=20&${this.jsonUrl}`,
        "JSON_CALLBACK"
      )
      .pipe(map((response: any) => response.data));
  }

  getAlbum(albumId: number): Observable<Album> {
    return this.http.jsonp(
      `${this.baseUrl}album/${albumId}?${this.jsonUrl}`,
      "JSONP_CALLBACK"
    ) as Observable<Album>;
  }
}
