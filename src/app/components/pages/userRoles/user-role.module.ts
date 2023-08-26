import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRolesComponent } from './user-roles.component';
import { UserRoleRoutingModule } from './user-role-routing.module';
import { SharedModule } from '../sharedmodule/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateRoleComponent } from './create-role/create-role/create-role.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [UserRolesComponent, CreateRoleComponent],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule
  ]
})
export class UserRoleModule { }
