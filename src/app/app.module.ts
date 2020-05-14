import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpInterceptorService } from "./utils/http-interceptor.service";
import { CoverSheetModule } from "./cover-sheet/cover-sheet.module";
import { ClientConfigComponent } from "./client-config/client-config.component";
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './utils/loader-interceptor.service';
import { LoaderService} from './service/loader.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginLogoutButtonComponent,
    BingMapComponent,
    ClientConfigComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OktaAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    OrderProcessingModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    CoverSheetModule,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
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
