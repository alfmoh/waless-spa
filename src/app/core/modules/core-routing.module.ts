import { BrowseComponent } from "./../components/browse/browse.component";
import { HomeComponent } from "./../components/home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const coreRoutes: Routes = [
  { path: "browse", component: BrowseComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
