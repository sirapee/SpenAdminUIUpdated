import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


  selectedDetails: any
  passwordForm! : FormGroup
  adminPasswordForm! : FormGroup
  adminData: any;
  userData: any;
  usersData: any;

  constructor(private fb: FormBuilder, private userService: UsersService,private notification: ToastrService,private spinner: NgxSpinnerService,) {

  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
   
      password: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [ '',[Validators.required]],

    },{
      validators: passwordMatchValidator()
    });

    this.adminPasswordForm = this.fb.group({
   
      currentPassword: ['',[Validators.required]],
      password: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [ '',[Validators.required]],
      isAdmin: [true] // Default to false
    },{
      validators: passwordMatchValidator()
    });


  }

  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
    }
  }


 
  selectedPasswordFormType: string = ''; 


  onSubmit() {
    if (this.selectedPasswordFormType === 'user') {
      if (this.passwordForm.valid) {
        this.submitUserPasswordApi(this.passwordForm.value);
      } else {
        this.notification.error('Please correct password fields.');
      }
    } else if (this.selectedPasswordFormType === 'admin') {
      if (this.adminPasswordForm.valid) {
        this.submitAdminPasswordApi(this.adminPasswordForm.value);
      } else {
        this.notification.error('Please correct password fields.');
      }
    } else {
      this.notification.error('Please select a password form type.');
    }
  }
  

  

  submitUserPasswordApi(passwordData: any) {
    this.spinner.show();
    let payload = {
      
      username: this.selectedDetails.username,
      newPassword: this.passwordForm.value.password,
      confirmPassword: this.passwordForm.value.confirmPassword
 
    };
  
    this.userService.changeUserPassword(payload).subscribe(
      (response: any) => {
        if (response.isSuccessful) {
          this.notification.success(response.responseMessage);
          this.spinner.hide();
          this.passwordForm.reset();
          // this.loadAllData();
          this.userService.closeModal();
          location.reload();
        } else {
          this.spinner.hide();
          this.notification.error(response.responseMessage);
         
        }
      },
      (error) => {
        this.spinner.hide();
        this.notification.error(error.error.responseMessage || error.error.message);
        console.error('User password error:', error);
      }
    );
  }
  
  submitAdminPasswordApi(passwordData: any) {
    this.spinner.show();
    let payload = {
   
      currentPassword: this.adminPasswordForm.value.currentPassword,
      newPassword: this.adminPasswordForm.value.password,
      confirmPassword: this.adminPasswordForm.value.confirmPassword,
      isAdmin: this.adminPasswordForm.value.isAdmin

    };
  
    this.userService.changeAdminPassword(payload).subscribe(
      (response: any) => {
        if (response.isSuccessful) {
          this.notification.success(response.responseMessage);
          this.adminPasswordForm.reset();
          this.spinner.hide();
          // this.loadAllData();
          this.userService.closeModal();
          location.reload();
        } else {
          this.spinner.hide();
          this.notification.error(response.responseMessage);
        }
      },
      (error) => {
        this.spinner.hide();
        this.notification.error(error.error.responseMessage || error.error.message);
        console.error('Admin user password error:', error);
      }
    );
  }
  
  
}
