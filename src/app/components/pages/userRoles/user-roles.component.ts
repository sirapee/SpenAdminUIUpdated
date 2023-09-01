import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { UsersService } from '../../services/userManagement/users.service';
import * as _ from 'lodash';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/roleService/role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent {


  searchTerm! : string;

  userData: any;
  p: number = 1; // Current page number
  pageSize: number = 20; // Page size
  totalItems: number = 0;
  live: boolean = true;
  loading: boolean = true;
  userDetail: any;
  selectedDetails: any = null;
  filteredUserData!: any;

  sortBy: string = '';
  sortOrder: string = 'asc';
  activeSortBy: string = ''; // Initialize activeSortBy property
  role: any;

  constructor(
    private roleService: RoleService, private notification: ToastrService, private spinner: NgxSpinnerService
 
  ) {}

  ngOnInit(): void {
    // this.usersService.userData$.subscribe((data) => {
    //   this.userData = data;
    // });
    // this.loadData();
    this.getRole();
  }




  getRole() {
    this.spinner.show();
    this.roleService.getRoles().subscribe(
      (res) => {
        this.loading = false;
        this.role = res;
        this.filteredUserData = this.role;
        this.spinner.hide();
      },
      (error) => {
        // console.error('Error fetching roles:', error);
        this.loading = false;
        this.spinner.hide();
      }
    );
  }


  search(): void {
    if (this.searchTerm !== '') {
      this.filteredUserData.roles = _.chain(this.role)
        .filter((result: any) => {
          // Add null checks before accessing properties for filtering
          const name = result.name || '';
          const roleCategory = result.roleCategory || '';
          const roleDescription = result.firstName || '';
          // const lastName = result.lastName || '';
          // const merchantName = result.merchantName || '';
          
          return (
            name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            roleCategory.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            roleDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) 
            // lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            // merchantName.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        })
        .sortBy((result: any) => result.name) // Sort based on username
        .value();
    } else {
      this.filteredUserData.roles = this.role.roles.slice();
    }
  }
  
  sort(property: string): void {
    if (this.activeSortBy === property) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.activeSortBy = property; // Set active sort property
      this.sortOrder = 'asc';
    }
  
    this.filteredUserData.roles = _.orderBy(this.filteredUserData.roles, [property], [this.sortOrder as 'asc' | 'desc']);
  }
  

  getSortIcon(property: string): string {
    if (this.activeSortBy === property) {
      return this.sortOrder === 'asc' ? 'feather ft-arrow-up' : 'feather ft-arrow-down';
    }
    return '';
  }
  




  confirmDeleteUser(username: string) {
    Swal.fire({
      title: 'Delete User',
      text: `You are about to delete this role, do you want to continue?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(username);
      
      }
    });
  }

  deleteUser(username: string) {
    // console.log('Deleting user:', username);
    this.spinner.show();
    this.roleService.delete(username).subscribe(
      (res: any) => {
        // console.log('API Response:', res); // Log the entire response for debugging
        if (res && res.issucessFul) {
          // console.log('User deleted successfully. Displaying success notification.');
          this.notification.success(res.responseMessage);
          this.spinner.hide();
          // console.log('Notification displayed. Reloading...');
          location.reload();
        } else {
          // console.log('Response indicates an error. Displaying error notification.');
          this.notification.error(res.responseMessage);
        }
      },
      (error) => {
        // console.error('Error deleting user:', error);
        this.notification['error'](error.error.responseMessage || error.error.message);
      }
    );
  }
  
  

}
