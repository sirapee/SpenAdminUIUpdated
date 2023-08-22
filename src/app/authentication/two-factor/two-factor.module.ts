import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TwoFactorComponent } from './two-factor.component';
import { TwoFactorRoutingModule } from './two-factor-routing.module';
// import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TwoFactorComponent
  ],
  imports: [
    CommonModule,
    TwoFactorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class TwoFactorModule { }
