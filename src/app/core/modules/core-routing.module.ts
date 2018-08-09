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

const coreRoutes: Routes = [
  { path: "browse", component: BrowseComponent, canActivate: [AuthGuard] },
  { path: "album/:id", component: AlbumComponent, canActivate: [AuthGuard] },
  { path: "artist/:id", component: ArtistComponent, canActivate: [AuthGuard] },
  { path: "queue", component: QueueComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
