import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  declarations: [],
  exports: [NgbModule, ReactiveFormsModule]
})
export class SharedModule {}
