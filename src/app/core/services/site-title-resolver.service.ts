import { PlayerService } from "./player.service";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SiteTitleResolverService implements Resolve<string> {
  constructor(private playerService: PlayerService) {}

  resolve() {
    return !this.playerService.siteTitle
      ? "Waless"
      : this.playerService.siteTitle;
  }
}
