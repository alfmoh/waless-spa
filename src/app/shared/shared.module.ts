import { TracksDisplayComponent } from "./components/tracks-display/tracks-display.component";
import { CarouselDirective } from "./directives/carousel.directive";
import { StoreModule } from "@ngrx/store";
import { CustomSlice } from "./pipes/customslice.pipe";
import { HttpClientJsonpModule } from "@angular/common/http";
import { TrackDurationPipe } from "./pipes/TrackDuration.pipe";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LeftSidebarComponent } from "./components/left-sidebar/left-sidebar.component";
import { PlayerComponent } from "./components/player/player.component";
import { CurrentlyPlayingComponent } from "./components/currently-playing/currently-playing.component";
import { sharedModuleFeature } from "./helpers/constants";
import { CustomRouteReuseStrategy } from "./helpers/customRouteReuseStrategy";
import { sharedReducer } from "./state/shared.reducer";
import { AddPlaylistComponent } from "./components/addPlaylist/addPlaylist.component";
import { TrackEllipsisComponent } from "./components/track-ellipsis/track-ellipsis.component";
import { CopyDirective } from "./directives/copy.directive";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    RouterModule.forChild([]),
    StoreModule.forFeature(sharedModuleFeature, sharedReducer)
  ],
  declarations: [
    LeftSidebarComponent,
    PlayerComponent,
    TrackDurationPipe,
    CustomSlice,
    CurrentlyPlayingComponent,
    CarouselDirective,
    TracksDisplayComponent,
    AddPlaylistComponent,
    TrackEllipsisComponent,
    CopyDirective
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    LeftSidebarComponent,
    PlayerComponent,
    TrackDurationPipe,
    CustomSlice,
    CurrentlyPlayingComponent,
    CarouselDirective,
    TracksDisplayComponent,
    AddPlaylistComponent,
    TrackEllipsisComponent,
    CopyDirective
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  entryComponents: [AddPlaylistComponent]
})
export class SharedModule {}
