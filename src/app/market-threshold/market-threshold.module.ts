import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MarketThresholdRoutingModule } from './market-threshold-routing.module';
import { MarketThresholdComponent } from './market-threshold.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MarketThresholdComponent],
  imports: [
    CommonModule,
    MarketThresholdRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MarketThresholdModule { }
