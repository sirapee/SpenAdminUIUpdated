import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { StoreService } from 'src/app/components/services/store/store.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent {

  factorForm!: FormGroup;
  userDetails: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
    private authService: AuthenticationService,
    private store : StoreService
  ) {}

  ngOnInit() {
    this.factorForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });

 

    const userDetailsString = this.store.getUserDetails(); 
    this.userDetails = JSON.parse(userDetailsString); 

    console.log(this.userDetails.username);

  }


  getOtpValue(): string {
    const otpValues = Object.values(this.factorForm.value);
    return otpValues.join('');
  }
  

  async submit(): Promise<void> {

    const otpValue = this.getOtpValue(); 
    const payload = {
      username: this.userDetails.username,
      token: otpValue,
      twoFactorType: this.userDetails.twoFactorType
    };
  
    this.spinner.show();
  
    try {
      const result: any = await this.authService.validate2FactorToken(payload).toPromise();
  
      if (result.loginSuccessful) {
        if (result.user.userType === 'AdminUser') {
       
          this.notification.success('Admin user logged in successfully !!');
          sessionStorage.setItem('token', result.token.accessToken);
          this.router.navigateByUrl('main/dashboard').then(() => {
            location.reload();
          });
        } else {
          this.notification.error('Access denied: Not an admin user');
        }
      } else {
        this.notification.error(result.responseMessage || result.message);
      }
    } catch (error: any) {
      this.notification.error(error.error.responseMessage || error.error.message);
    } finally {
      this.spinner.hide();
    }
  }
  

}
