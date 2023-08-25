import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';


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

  constructor(private fb: FormBuilder, private userService : UsersService, private notification: ToastrService) {

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

    this.userService.getRoles().subscribe(
      (res) => {
        this.role = res;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }


  submit() {
    // Call the API for admin user
    // let merchantIds = this.userData.map((organization: { id: any }) => organization.id);
    // let payload = {
    //   this.addOrganizationform.va
    // };
    this.userService.createOrganization(this.addOrganizationform.value).subscribe((res)=>{
      this.adminData = res;
      if(this.adminData.isSuccessful){
        this.notification.success('Admin User Created');
        // this.userService.updateUserData(res);
        // Clear the form for the next entry
        this.addOrganizationform.reset();
        location.reload();
      }else{
        this.notification.error(this.adminData.responseMessage)
      }
      
    })
    // console.log('Submitting admin data:', adminData);
  }

}
