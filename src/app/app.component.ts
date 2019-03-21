import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PlayerService } from "./core/services/player.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) =>
      this.title.setTitle(this.playerService.getSiteTitle(data.currentlyPlayingTrack))
    );
    const token = localStorage.getItem("token");
    if (token)
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
