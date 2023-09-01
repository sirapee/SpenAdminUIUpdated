import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnableTwoFactorComponent } from './enable-two-factor.component';
import { EnableTwoFactorRoutingModule } from './enable-two-factor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [EnableTwoFactorComponent],
  imports: [
    CommonModule,
    EnableTwoFactorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
    
  ]
})
export class EnableTwoFactorModule { }
