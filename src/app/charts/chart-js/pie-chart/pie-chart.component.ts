import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() data: object;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      let chartElement = document.getElementById('pieChartId');
      this.createChartObject(chartElement);
    }
  }

  createChartObject(domElement) {
    if (domElement) {
      return new Chart(domElement, {
        type: 'pie',
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
            align: 'start',
            text: 'Review Decision',
            // text: ['Review Decision', 'Request Decision'],
            fontStyle: 'normal',
            fontSize: 12
          },
          subtitle: {
            text: 'Request Decision'
          }
        }
      });
    }
  }

}
