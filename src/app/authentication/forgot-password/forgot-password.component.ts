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
    try {
      // Perform email confirmation logic here
      // Call the API to verify the email
      const response = await this.jarwisService.verifyEmail(this.forgotPasswordForm.value.email, true).toPromise();

      // Assuming the API returns a successful response
      
      // Store the email in the service
      // this.registrationService.setEmail(this.email);

      // Navigate to the next step (e.g., OTP page)
      this.router.navigate(['/otp']);
    } catch (error) {
      // Handle error response from the API
      console.error('Email verification error:', error);
      // Implement error handling, such as showing an error message to the user
    }
  }








}
