import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';
import { RoleService } from 'src/app/components/services/roleService/role.service';



@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  addUserform!: FormGroup;
  adminUserform!: FormGroup;
  userData: any;

  p: number = 1; // Current page number
  pageSize: number = 10; // Page size
  totalItems!: number;
  loading: boolean = true;
  role: any;
  adminData: any;
  usersData: any;
  newUserData!: any[];
  filteredUserData: any;
  userssData: any;

  constructor(private fb: FormBuilder, private userService: UsersService,private notification: ToastrService, private spinner : NgxSpinnerService, private roleService: RoleService) {

  }

  ngOnInit(): void {
    this.addUserform = this.fb.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
 
      lastName: ['', Validators.required],
      email: [ '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      userName: ['',],
      // country: ['', Validators.required],
      merchantName: ['',Validators.required],
      merchantId: ['', Validators.required],
   
      role: ['', Validators.required],
    
    });

    this.adminUserform = this.fb.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
 
      lastName: ['', Validators.required],
      email: [ '', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      userName: ['',],
  
   
      role: ['', Validators.required],
     
    });

    // this.loadData();
    this.getRole();
    // this.loadAllData();

    this.addUserform.get('merchantName')?.valueChanges.subscribe((selectedMerchantName) => {
      const selectedMerchant = this.userData.find(
        (organization: { merchantName: string }) => organization.merchantName === selectedMerchantName
      );
  
      if (selectedMerchant) {
        this.addUserform.get('merchantId')?.setValue(selectedMerchant.id);
      }
    });
  }

  selectedUserType: string = ''; 

  loadData() {
    const filters = {};
    this.loading = true; 
  
    this.userService.getAllMerchants(this.p, this.pageSize, filters).subscribe(
      (response) => {
        this.userData = response.organizations;
        console.log('Organizations:', this.userData);
  
      
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
    if (this.selectedUserType === 'user') {
      if (this.addUserform.valid) {
        this.submitUserApi(this.addUserform.value);
      } else {
        this.notification.error('Please fill in all required fields');
      }
    } else if (this.selectedUserType === 'admin') {
      if (this.adminUserform.valid) {
        this.submitAdminApi(this.adminUserform.value);
      } else {
        this.notification.error('Please fill in all required fields');
      }
    } else {
      this.notification.error('Please select a user type');
    }
  }
  

  
  
  


  submitUserApi(userData: any) {
    this.spinner.show();
    let payload = {
      
        phoneNumber: this.addUserform.value.phoneNumber,
        firstName: this.addUserform.value.firstName,
   
        lastName: this.addUserform.value.lastName,
        email: this.addUserform.value.email,
        userName: this.addUserform.value.email,
       
        merchantName: this.addUserform.value.merchantName,
        merchantId: this.addUserform.value.merchantId,
   
        role: this.addUserform.value.role,
 
    };
  
    this.userService.createUser(payload).subscribe(
      (response: any) => {
        if (response.isSuccessful) {
          this.notification.success(response.responseMessage);
          this.spinner.hide();
          this.addUserform.reset();
          this.loadAllData();
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
        // console.error('User creation error:', error);
      }
    );
  }
  
  submitAdminApi(userData: any) {
    this.spinner.show();
    let payload = {
   
        phoneNumber: this.adminUserform.value.phoneNumber,
        firstName: this.adminUserform.value.firstName,
      
        lastName: this.adminUserform.value.lastName,
        email: this.adminUserform.value.email,
        userName: this.adminUserform.value.email,
      
        role: this.adminUserform.value.role,

    };
  
    this.userService.createAdmin(payload).subscribe(
      (response: any) => {
        if (response.isSuccessful) {
          this.notification.success(response.responseMessage);
          this.addUserform.reset();
          this.spinner.hide();
          this.loadAllData();
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
        console.error('Admin user creation error:', error);
      }
    );
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


  async loadAllData() {
    const filters = {};

  await this.userService.getAllUsers(this.p, this.pageSize, filters).subscribe(
      (response) => {
        this.loading = false;
        this.userssData = response.users;
        this.filteredUserData = this.userData;
        this.userService.updateUserData(this.userData);
        this.totalItems = response.total;
        // this.submitForm();
      },
      (error) => {
        console.error('Error fetching reports:', error);
        this.loading = false;
      }
    );
  }
  

}
