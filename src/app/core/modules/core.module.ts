import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HomeComponent } from "../components/home/home.component";
import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    NavbarComponent,
    HomeComponent
  ],
  exports:[NavbarComponent]
})
export class CoreModule { }
