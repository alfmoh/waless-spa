import { AlbumEffects } from "./../components/state/album/album.effects";
import { BrowseEffects } from "./../components/state/browse/browse.effects";
import { ArtistComponent } from "./../components/artist/artist.component";
import { AlbumComponent } from "./../components/album/album.component";
import { QueueComponent } from "./../components/queue/queue.component";
import { BrowseComponent } from "./../components/browse/browse.component";
import { AuthModule } from "./auth.module";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HomeComponent } from "../components/home/home.component";
import { CoreRoutingModule } from "./core-routing.module";
import { NotFoundComponent } from "../components/notfound/notfound.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { coreReducer } from "../state/core.reducer";
import { coreModuleFeature } from "src/app/shared/helpers/constants";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    AuthModule,
    SharedModule,
    StoreModule.forFeature(coreModuleFeature, coreReducer),
    EffectsModule.forFeature([BrowseEffects, AlbumEffects])
  ],
  declarations: [
    NavbarComponent,
    BrowseComponent,
    QueueComponent,
    AlbumComponent,
    ArtistComponent,
    HomeComponent,
    NotFoundComponent
  ],
  exports: [NavbarComponent, AuthModule, NotFoundComponent]
})
export class CoreModule { }
