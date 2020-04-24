import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaCallbackComponent,
} from "@okta/okta-angular";

import config from "./app.config";
import { OrderDetailComponent } from "./order-processing/order-detail/order-detail.component";
import { OrderListComponent } from "./order-processing/order-list/order-list.component";

const routes: Routes = [
  {
    path: "implicit/callback",
    component: OktaCallbackComponent,
  },
  {
    path: "order-list",
    component: OrderListComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: "order-detail/:id",
    component: OrderDetailComponent,
    canActivate: [OktaAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: OKTA_CONFIG, useValue: config.oidc }],
})
export class AppRoutingModule {}
