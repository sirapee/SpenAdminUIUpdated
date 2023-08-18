import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

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
  ) {}

  ngOnInit() {
    this.factorForm = this.formBuilder.group({
      token: ['', [ Validators.required, Validators.pattern(/[0-9]+/), Validators.minLength(6), Validators.maxLength(6) ]],
    });

    this.getCurrentUser()

  }

  async getCurrentUser(): Promise<void> {
    this.spinner.show()
    await this.authService.getCurrentUser().toPromise().then((result: any) => {
      if(result.isSuccessful){
        this.spinner.hide()
        this.userDetails = result.user;
        sessionStorage.removeItem('token');
      }
    }, error => {
      this.spinner.hide()
      this.notification.error(error.error.respMessage || error.error.message);
    })
  }

  async submit(): Promise<void> {
    const payload = {
      username: this.userDetails.username,
      token: this.factorForm.value.token,
      twoFactorType: this.userDetails.twoFactorType
    }
    this.spinner.show()
    await this.authService.validate2FactorToken(payload).toPromise().then((result: any) => {
      if(result.loginSuccessful){
        this.spinner.hide()
        this.notification.success('User logged in successfully !!');
        sessionStorage.setItem('token', result.token.accessToken)
        this.router.navigateByUrl('main/dashboard').then(() => {
          window.location.reload();
        });
      } else {
        this.spinner.hide()
        this.notification.success(result.responseMessage || result.message);
      }
    }, error => {
      this.spinner.hide()
      this.notification.error(error.error.responseMessage || error.error.message);
    })
  }

}
