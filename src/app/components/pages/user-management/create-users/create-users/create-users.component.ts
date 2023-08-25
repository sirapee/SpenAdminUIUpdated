import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  addUserform!: FormGroup;
  userData: any;

  p: number = 1; // Current page number
  pageSize: number = 20; // Page size
  totalItems: number = 0;
  loading: boolean = true;
  role: any;
  adminData: any;
  usersData: any;
  newUserData!: any[];

  constructor(private fb: FormBuilder, private userService: UsersService,private notification: ToastrService,) {

  }

  ngOnInit(): void {
    this.addUserform = this.fb.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: [ '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      userName: ['', Validators.required],
      country: ['', Validators.required],
      merchantName: ['', Validators.required],
      merchantId: ['', Validators.required],
      employeeId: ['',],
      password: ['', [ Validators.required, Validators.pattern(/[^A-Za-z0-9]+/), Validators.minLength(8) ]],
      confirmPassword: [ '', [ Validators.required]],
      role: ['', Validators.required],
      userType: ['user', Validators.required]
    },{
      validators: passwordMatchValidator()
    });

    this.loadData();
    this.getRole();

    this.addUserform.get('merchantName')?.valueChanges.subscribe((selectedMerchantName) => {
      const selectedMerchant = this.userData.find(
        (organization: { merchantName: string }) => organization.merchantName === selectedMerchantName
      );
  
      if (selectedMerchant) {
        this.addUserform.get('merchantId')?.setValue(selectedMerchant.id);
      }
    });
  }


  loadData() {
    const filters = {};
    this.loading = true; // Set loading to true
  
    this.userService.getAllMerchants(this.p, this.pageSize, filters).subscribe(
      (response) => {
        this.userData = response.organizations;
        console.log('Organizations:', this.userData);
  
        // Loop through organizations and access merchantName
        let merchantIds = this.userData.map((organization: { id: any }) => organization.id);
        console.log ('zzdf', merchantIds)
  
        this.totalItems = response.totalCount;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching merchants:', error);
        this.loading = false;
      }
    );
  }
  



  submitForm() {
    if (this.addUserform.valid) {
      const userData = {
        ...this.addUserform.value,
        userType: this.addUserform.value.userType
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

    let payload = {
      phoneNumber: this.addUserform.value.phoneNumber,
      firstName: this.addUserform.value.firstName,
      middleName: this.addUserform.value.middleName,
      lastName: this.addUserform.value.lastName,
      email: this.addUserform.value.email,
      userName: this.addUserform.value.userName,
      country: this.addUserform.value.country,
      merchantName: this.addUserform.value.merchantName,
      merchantId: this.addUserform.value.merchantId,
      employeeId: this.addUserform.value.employeeId,
      password: this.addUserform.value.password,
      confirmPassword: this.addUserform.value.confirmPassword,
      role: this.addUserform.value.role,
    };
    this.userService.createUser(payload).subscribe((res) => {
      this.usersData = res;
      if(this.usersData.isSuccessful){
        this.notification.success(this.userData.responseMessage);
        // this.userService.updateUserData(res);
        // Clear the form for the next entry
        this.addUserform.reset();
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
    let payload = {
      phoneNumber: this.addUserform.value.phoneNumber,
      firstName: this.addUserform.value.firstName,
      middleName: this.addUserform.value.middleName,
      lastName: this.addUserform.value.lastName,
      email: this.addUserform.value.email,
      userName: this.addUserform.value.userName,
      country: this.addUserform.value.country,
      merchantName: this.addUserform.value.merchantName,
      merchantId: this.addUserform.value.merchantId,
      employeeId: this.addUserform.value.employeeId,
      password: this.addUserform.value.password,
      confirmPassword: this.addUserform.value.confirmPassword,
      role: this.addUserform.value.role,
    };
    this.userService.createAdmin(payload).subscribe((res)=>{
      this.adminData = res;
      if(this.adminData.isSuccessful){
        this.notification.success('Admin User Created');
        // this.userService.updateUserData(res);
        // Clear the form for the next entry
        this.addUserform.reset();
        location.reload();
      }else{
        this.notification.error(this.adminData.responseMessage)
      }
      
    })
    console.log('Submitting admin data:', userData);
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
  

}
