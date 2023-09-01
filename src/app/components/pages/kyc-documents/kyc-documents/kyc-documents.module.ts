import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycDocumentsComponent } from './kyc-documents.component';
import { KycDocumentsRoutingModule } from './kyc-documents-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../sharedmodule/shared.module';


@NgModule({
  declarations: [KycDocumentsComponent],
  imports: [
    CommonModule,
    KycDocumentsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule
  ]
})
export class KycDocumentsModule { }
