import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { TwoFactorComponent } from './authentication/two-factor/two-factor.component';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '2factor',
    component: TwoFactorComponent,
  },

  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },

  { path: 'otp', component: VerifyEmailComponent},

  { path: 'email-confirmation', component: ForgotPasswordComponent },



  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
