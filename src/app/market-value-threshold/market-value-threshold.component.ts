import { Component, OnInit } from '@angular/core';
import { MarketValueThresholdService } from './market-value-threshold.service';
interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

interface ThresholdValue {
  MKT_VAL_FROM: number;
  MKT_VAL_TO: number;
  VAR_THRESHOLD: number;
  REPDEL_INCL: boolean;
  Client: string;
  CREATED_ON?: any;
  CREATED_BY?: any;
  UPDATED_BY?: any;
  UPDATED_ON?: any;
}


@Component({
  selector: 'app-market-value-threshold',
  templateUrl: './market-value-threshold.component.html',
  styleUrls: ['./market-value-threshold.component.css']
})
export class MarketValueThresholdComponent implements OnInit {

  page = 1;
  pageSize = 3;
  collectionSize: number;
  mvtData: Array<ThresholdValue> = [];

  constructor(private mvtService: MarketValueThresholdService) { }

  ngOnInit() {

    this.mvtService.getMVT().subscribe(result => {
      if (result && result['data']) {
        // console.log('result', result['data']);
        this.mvtData = result['data'];
        this.collectionSize = this.mvtData.length;
      }
    });
  }



  get marketValueThreshold(): ThresholdValue[] {
    if (this.mvtData && this.mvtData.length) { 
      return this.mvtData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

}
