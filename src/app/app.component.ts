import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { siteTitle: string }) =>
      this.title.setTitle(data.siteTitle)
    );
    const token = localStorage.getItem("token");
    if (token)
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
