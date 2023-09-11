import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutRoutingModule } from './payout-routing.module';
import { PayoutComponent } from './payout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../../sharedmodule/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PayoutComponent],
  imports: [
    CommonModule,
    PayoutRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    NgbPaginationModule
  ]
})
export class PayoutModule { }
