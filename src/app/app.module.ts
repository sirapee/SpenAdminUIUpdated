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
import { AuthenticationModule } from './authentication/authentication.module';
import { MainModule } from './components/layout/main/main.module';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
// import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { SharedModule } from './components/pages/sharedmodule/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TimeagoModule } from 'ngx-timeago';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
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
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    }),
    TimeagoModule.forRoot(),
    
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
