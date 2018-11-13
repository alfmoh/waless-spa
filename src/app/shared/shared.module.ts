import { StoreModule } from "@ngrx/store";
import { CustomSlice } from "./pipes/customslice.pipe";
import { HttpClientJsonpModule } from "@angular/common/http";
import { TrackDurationPipe } from "./pipes/TrackDuration.pipe";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { LeftSidebarComponent } from "./components/left-sidebar/left-sidebar.component";
import { PlayerComponent } from "./components/player/player.component";
import { CurrentlyPlayingComponent } from "./components/currently-playing/currently-playing.component";
import { sharedModuleFeature } from "./helpers/constants";
import { sharedReducer } from "./state/shared.reducer";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
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
    CurrentlyPlayingComponent
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    LeftSidebarComponent,
    PlayerComponent,
    TrackDurationPipe,
    CustomSlice,
    CurrentlyPlayingComponent
  ]
})
export class SharedModule {}
