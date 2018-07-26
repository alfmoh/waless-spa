import { HomeComponent } from "./../components/home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const coreRoutes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
