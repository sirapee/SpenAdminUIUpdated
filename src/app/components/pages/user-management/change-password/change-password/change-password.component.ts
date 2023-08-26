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
      userType: ['user', Validators.required], // Default to 'user'
      currentPassword: ['',[Validators.required]],
      newPassword: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [ '', [ Validators.required]],

      newPasswords: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPasswords: [ '', [ Validators.required]],
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


 



  onSubmit() {
    this.spinner.show();
    const formValue = this.passwordForm.value;
  
    if (formValue.userType === 'user') {
      const userPayload = {
        username: this.selectedDetails.username,
        newPassword: formValue.newPassword,
        confirmPassword: formValue.confirmPassword
      };
  
      this.userService.changeUserPassword(userPayload).subscribe(
        (res: any) => {
          if (res.isSuccessful) {
            this.notification.success(res.responseMessage);
            this.passwordForm.reset();
            this.spinner.hide();
            location.reload();
          } else {
            this.notification.error(res.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error('An error occurred while processing your request.');
          console.error('User password change error:', error);
          this.spinner.hide();
        }
      );
  
    } else if (formValue.userType === 'admin') {
      this.spinner.show();
      const adminPayload = {
        currentPassword: formValue.currentPassword,
        newPasswords: formValue.newPassword,
        confirmPasswords: formValue.confirmPassword,
        isAdmin: formValue.isAdmin
      };
  
      this.userService.changeAdminPassword(adminPayload).subscribe(
        (res: any) => {
          if (res.isSuccessful) {
            this.notification.success(res.responseMessage);
            this.passwordForm.reset();
            this.spinner.hide();
            location.reload();
          } else {
            this.notification.error(res.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error(error.error.responseMessage || error.error.message);
          console.error('Admin password change error:', error);
          this.spinner.hide();
        }
      );
    }
  }
  
  
}
