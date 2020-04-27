import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketValueThresholdService {

  constructor(private _http: HttpClient) { }

  getMVT() {
    return this._http.get('assets/market-value-threshold.json').pipe(map(result => result));
  }
}
