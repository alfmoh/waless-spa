import { BrowseComponent } from "./../components/browse/browse.component";
import { AuthModule } from "./auth.module";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HomeComponent } from "../components/home/home.component";
import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
  imports: [CommonModule, CoreRoutingModule, AuthModule, SharedModule],
  declarations: [NavbarComponent, HomeComponent, BrowseComponent],
  exports: [NavbarComponent, AuthModule]
})
export class CoreModule { }
