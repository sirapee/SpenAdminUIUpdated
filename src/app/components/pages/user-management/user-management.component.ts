import { Component } from '@angular/core';
import { UsersService } from '../../services/userManagement/users.service';
import * as _ from 'lodash';


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
    private usersService: UsersService
 
  ) {}

  ngOnInit(): void {
    // this.dashboard();
    this.loadData();
    // this.filterUserData();
  }


  // loadData() {
  //   const filters = {}; 
  
  //   this.usersService
  //     .getAllUsers(this.p, this.pageSize, filters)
  //     .subscribe(
  //       (response) => {
  //         this.loading = false;
  //         this.userData = response.users;
  //         this.totalItems = response.total; 
  //       },
  //       (error) => {
  //         console.error('Error fetching reports:', error);
  //         this.loading = false;
  //       }
  //     );
  // }

  loadData() {
    const filters = {};

    this.usersService.getAllUsers(this.p, this.pageSize, filters).subscribe(
      (response) => {
        this.loading = false;
        this.userData = response.users;
        this.filteredUserData = this.userData;
        this.totalItems = response.total;

        // Update filteredUserData based on searchTerm
        // this.filterUserData();
      },
      (error) => {
        console.error('Error fetching reports:', error);
        this.loading = false;
      }
    );
  }

  // sort(column: string): void {
  //   if (this.sortColumn === column) {
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortColumn = column;
  //     this.sortDirection = 'asc';
  //   }

    // Call your search function to apply sorting
  //   this.search();
  // }

  // getSortIcon(column: string): string {
  //   if (this.sortColumn === column) {
  //     return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  //   }
  //   return 'fa-sort';
  // }


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
  
}
