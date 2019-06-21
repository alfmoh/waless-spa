import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { siteUrl } from "src/app/shared/helpers/constants";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = `${siteUrl}/auth/`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        this.setToken(response);
      })
    );
  }

  private setToken(response: any) {
    const user = response;
    if (user) {
      localStorage.setItem("token", user.tokenString);
      this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
    }
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model).pipe(
      map((response: any) => {
        this.setToken(response);
      })
    );
  }
}
