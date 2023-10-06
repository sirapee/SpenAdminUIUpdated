import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LienRoutingModule } from './lien-routing.module';
import { LienComponent } from './lien.component';
import { AddLienComponent } from './add/add-lien/add-lien.component';
import { UpdateLienComponent } from './update/update-lien/update-lien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [
    LienComponent,
    AddLienComponent,
    UpdateLienComponent
  ],
  imports: [
    CommonModule,
    LienRoutingModule,
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
export class LienModule { }
