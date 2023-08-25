import { Component } from '@angular/core';
import { UsersService } from '../../services/userManagement/users.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

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

  constructor(
    private usersService: UsersService, private notification: ToastrService
 
  ) {}

  ngOnInit(): void {
    this.usersService.userData$.subscribe((data) => {
      this.userData = data;
    });
    this.loadData();
  }




 async loadData() {
    const filters = {};

  await this.usersService.getAllUsers(this.p, this.pageSize, filters).subscribe(
      (response) => {
        this.loading = false;
        this.userData = response.users;
        this.filteredUserData = this.userData;
        this.usersService.updateUserData(this.userData);
        this.totalItems = response.total;
      },
      (error) => {
        console.error('Error fetching reports:', error);
        this.loading = false;
      }
    );
  }




  search(): void {
    if (this.searchTerm !== '') {
      this.filteredUserData = _.chain(this.userData)
        .filter((result: any) => {
          // Add null checks before accessing properties for filtering
          const username = result.username || '';
          const email = result.email || '';
          const firstName = result.firstName || '';
          const lastName = result.lastName || '';
          const merchantName = result.merchantName || '';
          
          return (
            username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            merchantName.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        })
        .sortBy((result: any) => result.username) // Sort based on username
        .value();
    } else {
      this.filteredUserData = this.userData.slice();
    }
  }
  
  sort(property: string): void {
    if (this.activeSortBy === property) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.activeSortBy = property; // Set active sort property
      this.sortOrder = 'asc';
    }
  
    this.filteredUserData = _.orderBy(this.filteredUserData, [property], [this.sortOrder as 'asc' | 'desc']);
  }
  

  getSortIcon(property: string): string {
    if (this.activeSortBy === property) {
      return this.sortOrder === 'asc' ? 'feather ft-arrow-up' : 'feather ft-arrow-down';
    }
    return '';
  }
  

  userDetails() {
    // const filters = {}; 
    const userId = this.userData.id
    this.usersService
      .getUserDetails(userId)
      .subscribe(
        (response) => {
          // this.loading = false;
          this.userDetail = response.user;
          this.usersService.getUserDetails(this.userDetail);
          // this.totalItems = response.total; 
        },
        (error) => {
          console.error('Error fetching reports:', error);
          // this.loading = false;
        }
      );
  }


  viewDetails(details:any){
    this.selectedDetails = details;
  }


  confirmEnableUser(username: string) {
    Swal.fire({
      title: 'Enable User',
      text: `You are about to enable this user, do you want to continue?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Enable',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.enableUser(username);
      }
    });
  }
  
  enableUser(username: string) {
    this.usersService.enable(username).subscribe(
      (res: any) => {
        this.notification['success'](res.message, 'Enabled User');
        location.reload();
        // You can update your data source or perform other necessary actions here
      },
      (error) => {
        console.error('Error enabling user:', error);
        this.notification['error']('An error occurred while enabling the user.');
      }
    );
  }



  confirmDisableUser(username: string) {
    Swal.fire({
      title: 'Disable User',
      text: `You are about to disable this user, do you want to continue?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Disable',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.disableUser(username);
      }
    });
  }
  
  disableUser(username: string) {
    this.usersService.disable(username).subscribe(
      (res: any) => {
        this.notification['success'](res.message, 'disabled User');
        location.reload();
        // You can update your data source or perform other necessary actions here
      },
      (error) => {
        console.error('Error disabling user:', error);
        this.notification['error']('An error occurred while disabling the user.');
      }
    );
  }


  confirmDeleteUser(username: string) {
    Swal.fire({
      title: 'Delete User',
      text: `You are about to delete this user, do you want to continue?`,
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
    this.usersService.delete(username).subscribe(
      (res: any) => {
        this.notification['success'](res.message, 'User deleted');
        location.reload();
        // You can update your data source or perform other necessary actions here
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.notification['error']('An error occurred while deleting the user.');
      }
    );
  }
  
  
}
