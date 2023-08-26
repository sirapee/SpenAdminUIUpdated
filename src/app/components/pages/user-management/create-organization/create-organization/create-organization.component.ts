import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';
import {  NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/components/services/roleService/role.service';


@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent {

  addOrganizationform! : FormGroup;
  // addUserform: any;
  adminData: any;
  // notification: any;
  // notification: any;
  role: any;

  constructor(private fb: FormBuilder, private userService : UsersService, private notification: ToastrService, private spinner : NgxSpinnerService, private roleService : RoleService) {

  }

  ngOnInit(): void {
    this.addOrganizationform = this.fb.group({
      phoneNumber: ['', Validators.required],
      rcNumber: ['', Validators.required],
      merchantName: ['', Validators.required],
      email: [ '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      username: ['', Validators.required],
      state: ['', Validators.required],
      employeeId: [''],
      firstname: ['', Validators.required],
      businessCategory: ['', Validators.required],
      businessType: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [ '', [ Validators.required]],
      role: ['', Validators.required]
    },{
      validators: passwordMatchValidator()
    });

    this.getRole();
  }


  getRole() {

    this.roleService.getRoles().subscribe(
      (res) => {
        this.role = res;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }


  submit() {
    
    if (this.addOrganizationform.valid) {
      this.spinner.show();
      this.userService.createOrganization(this.addOrganizationform.value).subscribe(
        (response: any) => {
          // this.spinner.show();
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.addOrganizationform.reset();
            this.spinner.hide();
            location.reload();
          } else {
            this.notification.error(response.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error('An error occurred while creating the organization.');
          console.error('Organization creation error:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.notification.error('Please fill in all fields.');
      this.spinner.hide();
    }
  }
  
  

}
