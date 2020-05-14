import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'http-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
}
