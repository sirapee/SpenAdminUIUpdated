import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  isMobileScreen: boolean = false;

  // isMobileScreen: boolean = false;
  countdown: string = '5:00'; // Initial time in mm:ss format
  countdownInterval: any;

  countdownStartTime: number | null = null;
  countdownDuration: number | null = null;
  remainingSeconds: number = 0; // Initialize with 0

  otpForm!: FormGroup;

  otpDigitsArray: any[] = new Array(6);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
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
   

    // Restore timer state from localStorage
    const timerStart = localStorage.getItem('timerStart');
    const remainingTime = localStorage.getItem('remainingTime');

    if (timerStart && remainingTime) {
      const currentTime = Date.now();
      const elapsed = currentTime - +timerStart;
      const remainingSeconds = +remainingTime - Math.floor(elapsed / 1000);

      if (remainingSeconds > 0) {
        this.startCountdown(remainingSeconds);
      } else {
        this.startCountdown(5 * 60); // Start from 5 minutes if timer has expired
      }
    } else {
      this.startCountdown(5 * 60);
    }
  }

  



  startCountdown(initialSeconds: number) {
    this.countdownStartTime = Date.now();
    this.countdownDuration = initialSeconds;
    this.remainingSeconds = initialSeconds;

    this.countdownInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateCountdownDisplay();

      if (this.remainingSeconds <= 0) {
        clearInterval(this.countdownInterval);

        // Clear countdown state from localStorage
        localStorage.removeItem('timerStart');
        localStorage.removeItem('remainingTime');
      }
    }, 1000);

    // Save timer state to localStorage
    localStorage.setItem('timerStart', this.countdownStartTime.toString());
    localStorage.setItem('remainingTime', this.countdownDuration.toString());
  }

  updateCountdownDisplay() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.countdown = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // onInput(value: string): void {
  //   this.otpForm.get('otp').setValue(value);
  // }
  
  // getOtpDigit(index: number): string {
  //   const digit = this.otpForm.get('otp').value[index];
  //   return digit || 'X';
  // }



  async resendOtp() {
    const email = sessionStorage.getItem('email');
  
    try {
      // Check if the initial OTP has expired
      const currentTime = Date.now();
      const timerStart = localStorage.getItem('timerStart');
      
      if (timerStart) {
        const elapsed = currentTime - +timerStart;
        const remainingTimeString = localStorage.getItem('remainingTime');
        const remainingSeconds = remainingTimeString ? +remainingTimeString - Math.floor(elapsed / 1000) : 0;
  
        if (remainingSeconds > 0) {

          this.notification.error(`Please wait until the initial OTP expires before resending. Time remaining: ${this.formatTime(remainingSeconds)}`);
        } else {
          // Proceed with resending OTP
          const result: any = await this.jarwisService.resendOtp(email).toPromise();
  
          if (result.isSuccessful) {
            this.notification.success(result.responseMessage);
            this.startCountdown(5 * 60); // Start a new countdown timer
          } else {
            this.notification.error('Otp resend failed.');
          }
        }
      } else {
       
      }
    } catch (error: any) {
      this.notification.error(error.error.responseMessage || error.error.message);
    }
  }
  
  

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = window.innerWidth < 992; // Adjust breakpoint as needed
  }

  // confirmEmail() {
  //    this.otpForm.value.otp = `${this.otpForm.value.digit1}${this.otpForm.value.digit2}${this.otpForm.value.digit3}${this.otpForm.value.digit4}${this.otpForm.value.digit5}${this.otpForm.value.digit6}`
  //    this.jarwisService.setOtp(this.otpForm.value.otp);
  //    this.router.navigate(['/password-reset']);
  //  }

  confirmEmail() {
    this.spinner.show();
    if (this.otpForm.valid) {
      const digitControls = [
        'digit1',
        'digit2',
        'digit3',
        'digit4',
        'digit5',
        'digit6'
      ];
  
      const otpDigits = digitControls.map(controlName =>
        this.otpForm.get(controlName)?.value || ''
      );
  
      const otp = otpDigits.join('');
      this.jarwisService.setOtp(otp);
      this.spinner.hide();
      // this.notification.success('Proceed to reset password.');
      this.router.navigate(['/password-reset']);
    } else {
      this.spinner.hide();
      this.notification.error('invalid.');
    }
  }
  
  
  

  ngOnDestroy() {
    clearInterval(this.countdownInterval);

    // Clear timer state from localStorage
    localStorage.removeItem('timerStart');
    localStorage.removeItem('remainingTime');
    sessionStorage.removeItem('email');
  }



}
