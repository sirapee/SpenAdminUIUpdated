import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/components/services/roleService/role.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  selectedDetails: any
  usersData: any;
  role: any;



constructor(
  private userService: UsersService, private notification: ToastrService, private roleService: RoleService
){}

ngOnInit(): void {

  this.getRole();
  

}


  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
    }
  }


  updateUser() {
    const payload = {
      phoneNumber: this.selectedDetails.phoneNumber,
      firstName: this.selectedDetails.firstName,
      middleName: this.selectedDetails.middleName,
      lastName: this.selectedDetails.lastName,
      email: this.selectedDetails.email,
      userName: this.selectedDetails.username,
      country: this.selectedDetails.country,
      merchantName: this.selectedDetails.merchantName,
      merchantId: this.selectedDetails.merchantId,
      employeeId: this.selectedDetails.employeeId,
      roles:[
        this.selectedDetails.roles, 
      ] 
    }
    this.userService.updateUser(this.selectedDetails.id,payload).subscribe((res) => {
      this.usersData = res;
      if(this.usersData.isSuccessful){
        this.notification.success(this.usersData.responseMessage);
        console.log('role', this.usersData.roles)
        this.userService.closeModal();
      }else{
        this.notification.error(this.usersData.responseMessage)
      }
     
    });
  }


  getRole() {

    this.roleService.getRoles().subscribe(
      (res) => {
        this.role = res;
      },
      (error) => {
        // console.error('Error fetching roles:', error);
      }
    );
  }

}
