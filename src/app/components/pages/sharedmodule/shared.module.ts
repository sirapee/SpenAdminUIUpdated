import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { ViewUsersComponent } from '../user-management/update-users/view-users/view-users.component';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';
import { AmountPipe } from '../wallets/amount.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    
  ],
  exports: [
    // ViewUsersComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [DatePipe],
})
export class SharedModule { }
