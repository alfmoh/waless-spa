import { map } from "rxjs/operators";
import { Track } from "./../models/Track";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { JSONP, baseUrl, jsonUrl } from "../helpers/constants";
import { Playlist } from "../models/Playlist";

@Injectable({
  providedIn: "root"
})
export class DeezerService {
  constructor(private http: HttpClient) {}

  getTrackList(url: string): Observable<Track[]> {
    return this.http
      .jsonp(`${url}?${jsonUrl}`, JSONP)
      .pipe(map((response: any) => response.data));
  }

  getChartAlbums(): Observable<Album[]> {
    return this.http
      .jsonp(`${baseUrl}chart?${jsonUrl}`, JSONP)
      .pipe(map((response: any) => response.albums.data));
  }

  getChartPlaylists(): Observable<Playlist[]> {
    return this.http
      .jsonp(`${baseUrl}chart/0/playlists?${jsonUrl}`, JSONP)
      .pipe(map((response: any) => response.data));
  }

  getArtist(artistId: number): Observable<Artist> {
    return this.http.jsonp(
      `${baseUrl}artist/${artistId}?${jsonUrl}`,
      JSONP
    ) as Observable<Artist>;
  }

  getArtistTopTracks(artistId: number): Observable<Track[]> {
    return this.http
      .jsonp(`${baseUrl}artist/${artistId}/top?limit=20&${jsonUrl}`, JSONP)
      .pipe(
        map((response: any) => response.data.filter(track => track.readable))
      );
  }

  getAlbum(albumId: number): Observable<Album> {
    return this.http.jsonp(
      `${baseUrl}album/${albumId}?${jsonUrl}`,
      JSONP
    ) as Observable<Album>;
  }

  getTrack(trackId: number): Observable<Track> {
    return this.http.jsonp(
      `${baseUrl}track/${trackId}?${jsonUrl}`,
      JSONP
    ) as Observable<Track>;
  }
}
