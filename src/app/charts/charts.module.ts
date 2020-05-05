import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { ChartModule } from 'angular-highcharts';
import { ChartJsComponent } from './chart-js/chart-js.component';
// import { SlChartsModule } from 'projects/sl-charts/src/public-api';
import { SlChartsModule } from 'sl-charts';

@NgModule({
  declarations: [PieChartComponent, HighchartsComponent, ChartJsComponent],
  imports: [
    CommonModule,
    ChartModule,
    SlChartsModule
  ],
  exports: [PieChartComponent, HighchartsComponent, ChartJsComponent],
})
export class ChartsModule { }
