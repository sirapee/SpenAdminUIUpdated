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

  OtpForm!: FormGroup;



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private notification: ToastrService,
  ) {}



  ngOnInit(): void {
    this.OtpForm = this.formBuilder.group({
      otp: [ '', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,12}$/) ]],
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = window.innerWidth < 992; // Adjust breakpoint as needed
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

  submit() {
    // Implement your form submission logic here
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval);

    // Clear timer state from localStorage
    localStorage.removeItem('timerStart');
    localStorage.removeItem('remainingTime');
  }

  confirmEmail() {
    // Perform email confirmation logic here
    // ...

    // Store the email in the service
    this.jarwisService.setOtp(this.OtpForm.value.otp);

    // Navigate to the next step
    this.router.navigate(['/password-reset']);
  }

}
