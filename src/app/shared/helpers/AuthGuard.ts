import { AlertifyService } from "./../services/Alertify.service";
import { AuthService } from "./../../core/services/auth.service";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  canActivate(
    route,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) return true;

    this.alertify.error("You need to be logged in to access this area");
    if (state.url && !this.authService.loggedIn())
      localStorage.setItem("returnUrl", state.url);

    this.router.navigate([""], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
