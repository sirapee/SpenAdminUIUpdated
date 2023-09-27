import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { InternalWalletsRoutingModule } from './internal-wallets-routing.module';
import { InternalWalletsComponent } from './internal-wallets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../../sharedmodule/shared.module';
import { WalletamountPipe } from './walletamount.pipe';
import { AddInternalWalletComponent } from '../add-internal-wallet/add-internal-wallet/add-internal-wallet.component';
// import { AmountPipe } from '../../wallets/amount.pipe';


@NgModule({
  declarations: [
    InternalWalletsComponent,
    WalletamountPipe,
    AddInternalWalletComponent
    
    // AmountPipe
  ],
  imports: [
    CommonModule,
    InternalWalletsRoutingModule,
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
export class InternalWalletsModule { }
