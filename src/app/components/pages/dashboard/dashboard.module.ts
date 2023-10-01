import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { DashboardamountPipe } from './dashboardamount.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardamountPipe,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule
  ],
  providers: [
    [DecimalPipe],
    { provide: NgChartsConfiguration, useValue: { generateColors: false },}
  ]
})
export class DashboardModule { }
