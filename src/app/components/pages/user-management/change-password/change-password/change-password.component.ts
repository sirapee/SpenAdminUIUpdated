import { Component } from '@angular/core';
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

  passwordForm! : FormGroup
  adminData: any;
  userData: any;
  usersData: any;

  constructor(private fb: FormBuilder, private userService: UsersService,private notification: ToastrService,) {

  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      newPassword: ['',[ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      // password: ['', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      userName : ['',[Validators.required]],
      confirmPassword: [ '', [ Validators.required]],
      isAdmin: [ true ],
      userType: ['user', Validators.required]
    },{
      validators: passwordMatchValidator()
    });



  }


  submitForm() {
    if (this.passwordForm.valid) {
      const userData = {
        ...this.passwordForm.value,
        userType: this.passwordForm.value.userType
      };
  
      if (userData.userType === 'user') {
        this.submitUserApi(userData);
      } else if (userData.userType === 'admin') {
        this.submitAdminApi(userData);
      } else {
        this.notification.error('Complete missing fields for user type');
      }
    } else {
      this.notification.error('Complete all fields');
    }
  }



  submitUserApi(userData: any) {

    // let payload = {
    //   phoneNumber: this.addUserform.value.phoneNumber,
    //   firstName: this.addUserform.value.firstName,
    //   middleName: this.addUserform.value.middleName,
    //   lastName: this.addUserform.value.lastName,
    //   email: this.addUserform.value.email,
    //   userName: this.addUserform.value.userName,
    //   country: this.addUserform.value.country,
    //   merchantName: this.addUserform.value.merchantName,
    //   merchantId: this.addUserform.value.merchantId,
    //   employeeId: this.addUserform.value.employeeId,
    //   password: this.addUserform.value.password,
    //   confirmPassword: this.addUserform.value.confirmPassword,
    //   role: this.addUserform.value.role,
    // };
    this.userService.createUser(this.passwordForm.value).subscribe((res) => {
      this.usersData = res;
      if(this.userData.isSuccessful){
        this.notification.success(this.userData.responseMessage);
        // this.userService.updateUserData(res);
        // Clear the form for the next entry
        this.passwordForm.reset();
        location.reload();
      }else{
        this.notification.error(this.userData.responseMessage)
      }
     
    });
    console.log('Submitting user data:', userData);
    // Implement your HTTP request here
  }
  
  
   submitAdminApi(userData: any) {
    // Call the API for admin user
    // let merchantIds = this.userData.map((organization: { id: any }) => organization.id);
    // let payload = {
    //   phoneNumber: this.addUserform.value.phoneNumber,
    //   firstName: this.addUserform.value.firstName,
    //   middleName: this.addUserform.value.middleName,
    //   lastName: this.addUserform.value.lastName,
    //   email: this.addUserform.value.email,
    //   userName: this.addUserform.value.userName,
    //   country: this.addUserform.value.country,
    //   merchantName: this.addUserform.value.merchantName,
    //   merchantId: this.addUserform.value.merchantId,
    //   employeeId: this.addUserform.value.employeeId,
    //   password: this.addUserform.value.password,
    //   confirmPassword: this.addUserform.value.confirmPassword,
    //   role: this.addUserform.value.role,
    // };
    this.userService.createAdmin(this.passwordForm.value).subscribe((res)=>{
      this.adminData = res;
      if(this.adminData.isSuccessful){
        this.notification.success('Admin User Created');
        // this.userService.updateUserData(res);
        // Clear the form for the next entry
        this.passwordForm.reset();
        location.reload();
      }else{
        this.notification.error(this.adminData.responseMessage)
      }
      
    })
    console.log('Submitting admin data:', userData);
  }

}
