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
  userId: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    if (authService.decodedToken)
    this.userId = authService.decodedToken.nameid;
    console.log(authService.decodedToken);
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(`${siteUrl}/users/${this.userId}/playlist`);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${siteUrl}/users/${this.userId}/playlist/${id}`);
  }
}
