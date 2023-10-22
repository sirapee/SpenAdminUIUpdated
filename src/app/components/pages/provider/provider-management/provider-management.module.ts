import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderManagementRoutingModule } from './provider-management-routing.module';
import { ProviderManagementComponent } from './provider-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ProviderManagementComponent
  ],
  imports: [
    CommonModule,
    ProviderManagementRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    NgbPagination
  ]
})
export class ProviderManagementModule { }
