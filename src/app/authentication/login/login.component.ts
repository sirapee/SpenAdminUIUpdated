import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/components/services/store/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isMobileScreen: boolean = false;

  loginForm!: FormGroup;

  failedLoginAttempts = 0;
  maxFailedAttempts = 3; 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
    private store : StoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [sessionStorage.getItem('rememberedUsername') || '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: [sessionStorage.getItem('rememberedPassword') || '', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      rememberMe: [false]
    });
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
      
      if (result.signInResult.requiresTwoFactor) {
        this.spinner.hide();
        this.router.navigateByUrl('two-factor');
      } else {
        sessionStorage.setItem('token', result.token.accessToken);
        
        // Set result.user in session storage
        this.store.setUserDetails(result.user);

        if (result.user.userType === 'AdminUser') {
          this.notification.success('Admin user logged in successfully !!');
          this.router.navigateByUrl('main/dashboard').then(() => {
            location.reload();
          });
        } else if (result.user.userType !== 'AdminUser') {
          this.notification.error('Not an admin user','Access denied.');
        } else {
          this.notification.error('Login failed: User type not recognized.');
        }
        
        // Reset the failed login attempts upon successful login
        this.failedLoginAttempts = 0;
      }
    } else {
      this.failedLoginAttempts++;

      // Calculate remaining attempts
      const remainingAttempts = this.maxFailedAttempts - this.failedLoginAttempts;

      if (this.failedLoginAttempts >= this.maxFailedAttempts) {
        this.notification.error('You have exceeded the maximum number of login attempts. Your account has been locked.');

      } else {
        this.notification.error(`Login failed. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`);
      }
    }
  } catch (error: any) {
    this.notification.error(error.error.responseMessage || error.error.message);
  } finally {
    this.spinner.hide();
  }
}


  
}
