import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";

import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderSearchComponent } from "./order-search/order-search.component";
import { EffectsModule } from "@ngrx/effects";
import { OrderProcessingEffects } from "./effects/order-processing.effects";
import {
  orderProcessingFeatureKey,
  reducer,
} from "./reducers/order-processing.reducer";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
@NgModule({
  declarations: [
    OrderListComponent,
    OrderSearchComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forFeature(orderProcessingFeatureKey, reducer),
    EffectsModule.forFeature([OrderProcessingEffects]),
    NgbModule
  ],
  exports: [OrderListComponent, OrderSearchComponent, OrderDetailComponent],
})
export class OrderProcessingModule {}
