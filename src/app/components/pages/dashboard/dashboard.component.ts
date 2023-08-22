import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboardService/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private dashboardService: DashboardService
 
  ) {}

  ngOnInit(): void {
    this.dashboard();
  }

  dashboard() {
    return this.dashboardService.dasboard().subscribe((res: any) => {
      const dashboardData = res.data;
    });
  }
}
