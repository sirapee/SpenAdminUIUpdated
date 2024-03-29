import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  isMobileScreen: boolean = false;

  forgotPasswordForm!: FormGroup;

  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [sessionStorage.getItem('rememberedUsername') || '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = window.innerWidth < 992; // Adjust breakpoint as needed
  }



  async confirmEmail() {
    this.spinner.show();

    try {
      const result: any = await this.jarwisService.verifyEmail(this.forgotPasswordForm.value.email, true).toPromise();
  
      if (result.isSuccessful) {
        this.spinner.hide();
        this.notification.success(result.responseMessage);
        sessionStorage.setItem('email', this.forgotPasswordForm.value.email);
        this.router.navigate(['auth/otp']);
     
      } else {
        this.notification.error('Verification failed.');
      }
    } catch (error:any) {
      this.notification.error(error.error.responseMessage || error.error.message);
    } finally {
      this.spinner.hide();
    }
  }








}
