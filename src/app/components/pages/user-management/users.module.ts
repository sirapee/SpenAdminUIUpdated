import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../sharedmodule/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ViewUsersComponent } from './update-users/view-users/view-users.component';
import { CreateUsersComponent } from './create-users/create-users/create-users.component';
import { CreateOrganizationComponent } from './create-organization/create-organization/create-organization.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LockAccountComponent } from './lock-account/lock-account/lock-account.component';
// import { RolesComponent } from './roles/allroles/roles/roles.component';
// import { AddRolesComponent } from './roles/addroles/add-roles/add-roles.component';
// import { passwordMatchValidator } from 'src/app/authenticationvalidator/confirm.validator';



@NgModule({
  declarations: [UserManagementComponent, ViewUsersComponent, CreateUsersComponent, CreateOrganizationComponent, ChangePasswordComponent, LockAccountComponent,],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule
  ]
})
export class UsersModule { }
