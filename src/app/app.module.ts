import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/modules/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { JwtModule } from "@auth0/angular-jwt";
import { siteHost } from "./shared/helpers/constants";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: "Waless DevTools",
      maxAge: 25,
      logOnly: environment.production
    }),
    NgbModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getItem,
        whitelistedDomains: [siteHost]
      }
    })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function getItem() {
  return localStorage.getItem("token");
}
