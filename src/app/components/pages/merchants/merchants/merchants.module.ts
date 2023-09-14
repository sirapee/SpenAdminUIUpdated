import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './merchants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../sharedmodule/shared.module';
import { CreateMerchantComponent } from '../create-merchant/create-merchant.component';
import { UpdateMerchantComponent } from '../update-merchant/update-merchant.component';


@NgModule({
  declarations: [
    MerchantsComponent,
    CreateMerchantComponent,
    UpdateMerchantComponent
  ],
  imports: [
    CommonModule,
    MerchantsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    NgbPaginationModule
  ]
})
export class MerchantsModule { }
