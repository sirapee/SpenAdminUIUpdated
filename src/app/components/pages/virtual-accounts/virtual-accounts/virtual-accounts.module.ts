import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualAccountsComponent } from './virtual-accounts.component';
import { VirtualAccountsRoutingModule } from './virtual-accounts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../sharedmodule/shared.module';
import { TimeagoModule } from 'ngx-timeago';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [VirtualAccountsComponent],
  imports: [
    CommonModule,
    VirtualAccountsRoutingModule,
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
export class VirtualAccountsModule { }
