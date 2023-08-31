import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JarwisService } from '../../services/jarwis.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-enable-two-factor',
  templateUrl: './enable-two-factor.component.html',
  styleUrls: ['./enable-two-factor.component.css']
})
export class EnableTwoFactorComponent {
  
  // isMobileScreen: boolean = false;
  countdown: string = '5:00'; // Initial time in mm:ss format
  countdownInterval: any;

  countdownStartTime: number | null = null;
  countdownDuration: number | null = null;
  remainingSeconds: number = 0; // Initialize with 0

  otpForm!: FormGroup;

  otpDigitsArray: any[] = new Array(6);
  authdata: any;
  qrimg: any;
  isCopied = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthenticationService,
    private notification: ToastrService,
    private clipboard: Clipboard
  ) {}



  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    
    });
   

    this.authService.setup2fa('GoogleAuth').subscribe(
      (response) => {
        this.authdata = response;
        this.qrimg = this.authdata.barcodeImageUrl
        console.log('Two-factor authentication setup successful', response);
 
      },
      (error) => {
        console.error('Error setting up two-factor authentication', error);
    
      }
    );
    


  }

  enable2fa() {
    this.spinner.show();
    
    // Concatenate OTP values from form controls into a single string
    const otpValue = this.getOtpValue();
  
    const payload = {
      username: this.authdata.account,
      token: otpValue,
      twoFactorType: 'GoogleAuth'
    };
  
    this.authService.enable2fa(payload).subscribe(
      (response) => {
        if (response.isSuccessful) {
          this.notification.success('Two-factor authentication successfully enabled.');
          this.spinner.hide();
          
          // Clear session and navigate to the login page
          sessionStorage.clear();
          this.router.navigateByUrl('auth/login');
        } else {
          this.notification.error('Error enabling two-factor authentication.');
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error setting up two-factor authentication', error);
        this.notification.error('An error occurred while enabling two-factor authentication.');
        this.spinner.hide();
      }
    );
  }
  
  getOtpValue(): string {
    const otpValues = Object.values(this.otpForm.value);
    return otpValues.join('');
  }
  


  copyToClipboard(text: string): void {
    this.clipboard.copy(text);
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000); // Reset the check after 2 seconds
  }

}
