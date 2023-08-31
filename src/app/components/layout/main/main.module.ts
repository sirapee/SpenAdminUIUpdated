import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '../../pages/dashboard/dashboard.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersModule } from '../../pages/user-management/users.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DashboardModule,
    UsersModule,
    NgxSpinnerModule
  ]
})
export class MainModule { }
