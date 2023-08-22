import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule
  ],
  providers: [DatePipe],
})
export class SharedModule { }
