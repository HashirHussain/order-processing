import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() data: object;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      let chartElement = document.getElementById('doughnutChartId');
      this.createChartObject(chartElement);
    }
  }

  createChartObject(domElement) {
    if (domElement) {
      return new Chart(domElement, {
        type: 'doughnut',
        data: this.data,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: false //this will remove only the label
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false,
                // drawOnChartArea: false
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                display: false //this will remove only the label
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false,
                // drawOnChartArea: false
              }
            }]
          },
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              // fontColor: 'rgb(255, 99, 132)'
              boxWidth: 0
            }
          },
          title: {
            display: true,
            position: 'top',
            text: 'My Completed Goal',
            fontStyle: 'normal',
            fontSize: 12
          }
        }
      });
    }
  }

}
