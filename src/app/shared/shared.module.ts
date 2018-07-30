import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';

@NgModule({
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  declarations: [LeftSidebarComponent],
  exports: [NgbModule, ReactiveFormsModule, LeftSidebarComponent]
})
export class SharedModule {}
