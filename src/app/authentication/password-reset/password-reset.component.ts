import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JarwisService } from '../services/jarwis.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  resetForm!: FormGroup;
  isMobileScreen: boolean = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: [sessionStorage.getItem('rememberedUsername') || '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: [sessionStorage.getItem('rememberedPassword') || '', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [sessionStorage.getItem('rememberedPassword') || '', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
    });



  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = window.innerWidth < 992; // Adjust breakpoint as needed
  }



  async resetPassword(): Promise<void> {

    const storedOtp = this.jarwisService.getStoredOtp();
    this.spinner.show();
  
    const payload = {
      token: storedOtp,
      email: this.resetForm.value.email,
      password: this.resetForm.value.password,
      confirmPassword: this.resetForm.value.confirmPassword,
    };
  
    try {
      const result: any = await this.jarwisService.passwordReset(payload).toPromise();
  
      if (result.isSuccessful) {
        this.spinner.hide();
        this.notification.success(result.responseMessage);
        this.router.navigate(['/login']);
     
      } else {
        this.notification.error('Reset unsuccessful.');
      }
    } catch (error:any) {
      this.notification.error(error.error.responseMessage || error.error.message);
    } finally {
      this.spinner.hide();
    }
  }

}
