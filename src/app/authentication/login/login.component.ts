import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isMobileScreen: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [sessionStorage.getItem('rememberedUsername') || '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: [sessionStorage.getItem('rememberedPassword') || '', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      rememberMe: [false]
    });
  }
  

  // async submit(): Promise<void> {
  //   this.spinner.show()
  //   await this.jarwisService.login(this.loginForm.value).toPromise().then((result: any) => {
  //     if(result.loginSuccessful) {
  //       if(result.twoFactorRequired) {
  //         this.spinner.hide()
  //         this.router.navigateByUrl('2factor')
  //         sessionStorage.setItem('token', result.token.accessToken)
  //       } else {
  //         this.notification.success('User logged in successfully !!');
  //         sessionStorage.setItem('token', result.token.accessToken)
  //         this.router.navigateByUrl('main/dashboard').then(() => {
  //           window.location.reload();
  //         });
  //       }
  //       this.spinner.hide()
  //     } else {
  //       this.spinner.hide()
  //     }
  //   }, error => {
  //     this.spinner.hide()
  //     this.notification.error(error.error.respMessage || error.error.message);
  //   })
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = window.innerWidth < 992; 
  }

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
        
        if (result.twoFactorRequired) {
          this.spinner.hide();
          this.router.navigateByUrl('2factor');
        } else {
          sessionStorage.setItem('token', result.token.accessToken);
  
          // Check user type
          if (result.user.userType === 'AdminUser') {
            this.notification.success('logged in successfully !!');
            this.router.navigateByUrl('main/dashboard').then(() => {
              location.reload();
            });
          } else if (result.user.userType !== 'AdminUser') {
            this.notification.error('Access denied: Admin users only.');
          } else {
            this.notification.error('Login failed: User type not recognized.');
          }
        }
      } else {
        this.notification.error('Login failed.');
      }
    } catch (error:any) {
      this.notification.error(error.error.responseMessage || error.error.message);
    } finally {
      this.spinner.hide();
    }
  }
  
  
}
