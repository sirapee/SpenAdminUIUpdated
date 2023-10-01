import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { SettlementRoutingModule } from './settlement-routing.module';
import { SettlementComponent } from './settlement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { RegularizeComponent } from '../regularize/regularize/regularize.component';
// import { AmountPipe } from '../../wallets/amount.pipe';


@NgModule({
  declarations: [
    SettlementComponent,
    RegularizeComponent
    // AmountPipe
  ],
  imports: [
    CommonModule,
    SettlementRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    NgbPaginationModule
  ],
  providers: [DecimalPipe], 
  
})
export class SettlementModule { }
