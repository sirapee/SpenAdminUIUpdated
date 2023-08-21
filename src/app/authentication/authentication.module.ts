import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
      { path: 'password-reset', loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule) },
      { path: 'two-factor', loadChildren: () => import('./two-factor/two-factor.module').then(m => m.TwoFactorModule) },
      { path: 'otp', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
      // ... other authentication routes
    ])
  ]
})
export class AuthenticationModule { }
