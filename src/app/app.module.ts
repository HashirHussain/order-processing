import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { OktaAuthModule } from "@okta/okta-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { OrderProcessingModule } from "./order-processing/order-processing.module";
import { AuthInterceptor } from "./auth.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginLogoutButtonComponent } from "./login-logout-button.component";
import { BingMapComponent } from "./bing-map/bing-map.component";
import { HttpInterceptorService } from "./utils/http-interceptor.service";
import { CoverSheetModule } from "./cover-sheet/cover-sheet.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginLogoutButtonComponent,
    BingMapComponent,
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    OrderProcessingModule,
    CoverSheetModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
