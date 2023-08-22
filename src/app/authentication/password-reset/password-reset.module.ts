import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';




@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class PasswordResetModule { }
