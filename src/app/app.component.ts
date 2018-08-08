import { DeezerService } from './shared/services/deezer.service';
import { PlayerService } from './core/services/player.service';
import { AuthService } from "./core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token)
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
