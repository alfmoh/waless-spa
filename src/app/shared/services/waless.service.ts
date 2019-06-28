import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Observable } from "rxjs";
import { Playlist } from "../models/Playlist";
import { siteUrl } from "../helpers/constants";

@Injectable({
  providedIn: "root"
})
export class WalessService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(
      `${siteUrl}/users/${this.authService.getTokenUser().nameid}/playlist`
    );
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(
      `${siteUrl}/users/${
        this.authService.getTokenUser().nameid
      }/playlist/${id}`
    );
  }

  addToPlaylist(playlistId: number, track: any) {
    return this.http.post(
      `${siteUrl}/users/${
        this.authService.getTokenUser().nameid
      }/playlist/${playlistId}`,
      track
    );
  }

  createPlaylist(playlistContent: any) {
    return this.http.post(
      `${siteUrl}/users/${this.authService.getTokenUser().nameid}/playlist/`,
      playlistContent
    );
  }

  deletePlaylist(playlistId: number) {
    return this.http.delete(
      `${siteUrl}/users/${
        this.authService.getTokenUser().nameid
      }/playlist/${playlistId}`
    );
  }
}
