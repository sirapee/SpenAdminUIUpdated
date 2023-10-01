// import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboardService/dashboard.service';
import { Component, OnInit } from '@angular/core';
// import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
// import { LabelItem } from 'chart.js';
import Chart from 'chart.js/auto';
import { StoreService } from '../../services/store/store.service';
// import * as Chart from 'chart.js';



interface CollectionData {
  total: number;
  month: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public chart: Chart | undefined;
  public dashboardData: any = {}
  username: any;

  constructor(private dashboardService: DashboardService, private store: StoreService) {}

  ngOnInit(): void {


    this.dashboardService.dashboard().subscribe((res: any) => {
      if (res && res.collectionsGraph) {
        this.dashboardData = res;
        const collectionsGraph = res.collectionsGraph;
    
        const chartLabels: string[] = collectionsGraph.map((item: { month: any; }) => item.month);
        const chartData: number[] = collectionsGraph.map((item: { total: any; }) => item.total);
    
        this.createChart(res.collectionsGraph);

      }
    });
  }    


  
  // ...
  
  createChart(data: any[]): void {
    const chartLabels: string[] = data.map(item => item.month);
    const chartData: number[] = data.map(item => item.total);
  
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Metrics',
            data: chartData,
            borderColor: 'red',
            
          }
        ]
      },
      options: {
        responsive: true,
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // }
      }
    }); 
  }
  
  

}

