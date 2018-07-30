import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  declarations: [LeftSidebarComponent, PlayerComponent],
  exports: [NgbModule, ReactiveFormsModule, LeftSidebarComponent, PlayerComponent]
})
export class SharedModule {}
