import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/components/services/store/store.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword: boolean = true;

  isMobileScreen: boolean = false;

  loginForm!: FormGroup;

  failedLoginAttempts = 0;
  maxFailedAttempts = 3; 
  userDetails: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
    private store : StoreService,
    private authService : AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: [ '', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      rememberMe: [false]
    });

    
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.isMobileScreen = window.innerWidth < 992; 
  // }


// async submit(): Promise<void> {
//   this.spinner.show();

//   const payload = {
//     username: this.loginForm.value.username,
//     password: this.loginForm.value.password,
//     rememberMe: this.loginForm.value.rememberMe 
//   };

//   try {
//     const result: any = await this.jarwisService.login(payload).toPromise();

//     if (result.loginSuccessful) {
      
//       if (result.signInResult.requiresTwoFactor) {
//         this.spinner.hide();
//         this.router.navigateByUrl('two-factor');
//       } else {
//         sessionStorage.setItem('token', result.token.accessToken);

       
//         if (result.user.userType === 'AdminUser') {
//           this.notification.success('Admin user logged in successfully !!');
//           this.router.navigateByUrl('main/dashboard').then(() => {
//             location.reload();
//           });
//         } else if (result.user.userType !== 'AdminUser') {
//           this.notification.error('Not an admin user','Access denied.');
//         } else {
//           this.notification.error('Login failed: User type not recognized.');
//         }
        
       
//         this.failedLoginAttempts = 0;
//       }
//     } else {
//       this.failedLoginAttempts++;

   
//       const remainingAttempts = this.maxFailedAttempts - this.failedLoginAttempts;

//       if (this.failedLoginAttempts >= this.maxFailedAttempts) {
//         this.notification.error('You have exceeded the maximum number of login attempts. Your account has been locked.');

//       } else {
//         this.notification.error(`Login failed. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`);
//       }
//     }
//   } catch (error: any) {
//     this.notification.error(error.error.responseMessage || error.error.message);
//   } finally {
//     this.spinner.hide();
//   }
// }




async submit(): Promise<void> {
  this.spinner.show();

  const payload = {
    username: this.loginForm.value.username,
    password: this.loginForm.value.password,
    rememberMe: this.loginForm.value.rememberMe 
  };

  try {
    const result: any = await this.jarwisService.login(payload).toPromise();

    if (result.loginSuccessful) {
  
      if (result.user.twoFactorEnabled === false) {
        this.spinner.hide();
        sessionStorage.setItem('token', result.token.accessToken);
      
        this.router.navigateByUrl('auth/setup-2fa');
     
      } else {
        this.spinner.hide();
        if (result.user.isFirstLogin) {
          this.router.navigateByUrl('forgot-password');
        } else {
       
          this.router.navigateByUrl('auth/two-factor');
        }
      
        const userDetailsString = JSON.stringify(result.user);
        this.store.setUserDetails(userDetailsString);
       
        // this.store.setUserDetails(JSON.stringify(result.user)); 
      }
    } 
  } catch (error: any) {
    this.notification.error(error.error.responseMessage || error.error.message);
  } finally {
    this.spinner.hide();
  }
}




// async getCurrentUser(): Promise<void> {
//   this.spinner.show();
  
//   try {
//     const result: any = await this.authService.getCurrentUser().toPromise();
    
//     if (result.loginSuccessful) {
//       sessionStorage.getItem('token',);
//       this.spinner.hide();
//       this.userDetails = result.user;
//     }
//   } catch (error: any) {
//     this.spinner.hide();
//     this.notification.error(error.error.responseMessage || error.error.message);
//   }
// }

  
}
