import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { EnableTwoFactorComponent } from './enable-2fa/enable-two-factor/enable-two-factor.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
      { path: 'password-reset', loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule) },
      { path: 'two-factor', loadChildren: () => import('./two-factor/two-factor.module').then(m => m.TwoFactorModule) },
      { path: 'otp', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
      { path: 'setup-2fa', loadChildren: () => import('./enable-2fa/enable-two-factor/enable-two-factor.module').then(m => m.EnableTwoFactorModule)}
      // ... other authentication routes
    ])
  ]
})
export class AuthenticationModule { }
