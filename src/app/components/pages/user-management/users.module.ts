import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../sharedmodule/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ViewUsersComponent } from './update-users/view-users/view-users.component';



@NgModule({
  declarations: [UserManagementComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ]
})
export class UsersModule { }
