// import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboardService/dashboard.service';
import { Component, OnInit } from '@angular/core';
// import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
// import { LabelItem } from 'chart.js';
import Chart from 'chart.js/auto';
import { StoreService } from '../../services/store/store.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public chart: Chart | undefined;
  public dashboardData: any = {}; // Initialize with an empty object
  username: any;

  constructor(private dashboardService: DashboardService, private store: StoreService) {}

  ngOnInit(): void {


    this.dashboardService.dashboard().subscribe((res: any) => {
      if (res) {
        this.dashboardData = res;
        console.log(this.dashboardData);

        const chartLabels = Object.keys(this.dashboardData);
        const chartData = Object.values(this.dashboardData) as number[];

        this.createChart(chartLabels, chartData);
      }
    });
  }

  createChart(labels: string[], data: number[]): void {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Metrics',
            data: data,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

}

