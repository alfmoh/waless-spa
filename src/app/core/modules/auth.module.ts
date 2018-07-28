import { AuthComponent } from "./../components/auth/auth.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [AuthComponent],
  entryComponents: [AuthComponent]
})
export class AuthModule {}
