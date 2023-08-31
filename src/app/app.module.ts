import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UseErrorInterceptor } from './authentication/services/error.interceptor';
// import { HeaderComponent } from './components/layout/header/header.component';
// import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
// import { MainComponent } from './components/layout/main/main.component';
// import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
// import { LoginComponent } from './authentication/login/login.component';
// import { TwoFactorComponent } from './authentication/two-factor/two-factor.component';
// import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
// import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { MainModule } from './components/layout/main/main.module';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
// import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { SharedModule } from './components/pages/sharedmodule/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { KycDocumentsComponent } from './components/pages/kyc-documents/kyc-documents/kyc-documents.component';
// import { RolesComponent } from './components/pages/roles/roles/roles.component';
// import { UserRolesComponent } from './components/pages/userRoles/user-roles/user-roles.component';
// import { CreateOrganizationComponent } from './create-organization/create-organization.component';
// import { NgxPaginationModule } from 'ngx-pagination/public-api';
// import { ElModule } from 'element-angular';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    // KycDocumentsComponent,
    // RolesComponent,
    // UserRolesComponent,
    // CreateOrganizationComponent,
    // UserManagementComponent,
    // HeaderComponent,
    // SidebarComponent,
    // MainComponent,
    // DashboardComponent,
    // LoginComponent,
    // TwoFactorComponent,
    // PasswordResetComponent,
    // ForgotPasswordComponent,
    // VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AuthenticationModule,
    MainModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    }),
    
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [UseErrorInterceptor],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
