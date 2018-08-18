import { AlbumComponent } from "./../components/album/album.component";
import { QueueComponent } from "./../components/queue/queue.component";
import { BrowseComponent } from "./../components/browse/browse.component";
import { HomeComponent } from "./../components/home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "../components/artist/artist.component";
import { AuthGuard } from "../../shared/helpers/AuthGuard";
import { NotFoundComponent } from "../components/notfound/notfound.component";
import { SiteTitleResolverService } from "../services/site-title-resolver.service";

const coreRoutes: Routes = [
  {
    path: "browse",
    component: BrowseComponent,
    canActivate: [AuthGuard],
    resolve: { siteTitle: SiteTitleResolverService },
    runGuardsAndResolvers: "always"
  },
  {
    path: "album/:id",
    component: AlbumComponent,
    canActivate: [AuthGuard],
    resolve: { siteTitle: SiteTitleResolverService }
  },
  {
    path: "artist/:id",
    component: ArtistComponent,
    canActivate: [AuthGuard],
    resolve: { siteTitle: SiteTitleResolverService }
  },
  {
    path: "queue",
    component: QueueComponent,
    canActivate: [AuthGuard],
    resolve: { siteTitle: SiteTitleResolverService }
  },
  {
    path: "",
    component: HomeComponent,
    resolve: { siteTitle: SiteTitleResolverService }
  },
  {
    path: "404",
    component: NotFoundComponent,
    resolve: { siteTitle: SiteTitleResolverService }
  },
  {
    path: "**",
    redirectTo: "404",
    resolve: { siteTitle: SiteTitleResolverService }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
