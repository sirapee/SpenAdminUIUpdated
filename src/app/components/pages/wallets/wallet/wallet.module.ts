import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../../sharedmodule/shared.module';
import { AddWalletComponent } from '../add-wallet/add-wallet/add-wallet.component';
import { AmountPipe } from '../amount.pipe';



@NgModule({
  declarations: [
    WalletComponent,
    AddWalletComponent,
    AmountPipe
    
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
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
export class WalletModule { }
