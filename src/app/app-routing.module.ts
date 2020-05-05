import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaCallbackComponent
} from "@okta/okta-angular";

import config from "./app.config";
import { OrderDetailComponent } from "./order-processing/order-detail/order-detail.component";
import { OrderListComponent } from "./order-processing/order-list/order-list.component";
import { BingMapComponent } from "./bing-map/bing-map.component";
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';

const routes: Routes = [
  {
    path: "implicit/callback",
    component: OktaCallbackComponent
  },
  {
    path: "order-list",
    component: OrderListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: "order-detail/:id",
    component: OrderDetailComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: "bing-map",
    component: BingMapComponent
  },
  {
    path: 'configurations',
    loadChildren: () => import('./market-threshold/market-threshold.module').then(m => m.MarketThresholdModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: OKTA_CONFIG, useValue: config.oidc }]
})
export class AppRoutingModule {}
