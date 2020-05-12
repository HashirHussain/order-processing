import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() data: object;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      let chartElement = document.getElementById('lineChartId');
      this.createChartObject(chartElement);
    }
  }

  createChartObject(domElement) {
    if (domElement) {
      return new Chart(domElement, {
        type: 'line',
        data: this.data,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: true,
            position: 'top',
            paddingBottom: 25,
            labels: {
              // fontColor: 'rgb(255, 99, 132)', // 'rgb(255, 99, 132)',
              boxWidth: 10
            }
          },
          plugins: {
            // showLine: true,
            // fill: false,
            steppedLine: true
          }
        }
      });
    }
  }

}
