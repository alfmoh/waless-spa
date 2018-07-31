import { AlbumComponent } from "./../components/album/album.component";
import { QueueComponent } from "./../components/queue/queue.component";
import { BrowseComponent } from "./../components/browse/browse.component";
import { HomeComponent } from "./../components/home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "../components/artist/artist.component";

const coreRoutes: Routes = [
  { path: "browse", component: BrowseComponent },
  { path: "album/:id", component: AlbumComponent },
  { path: "artist/:id", component: ArtistComponent },
  { path: "queue", component: QueueComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
