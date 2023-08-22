import { Component } from '@angular/core';
import { UsersService } from '../../services/userManagement/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  userData: any;
  p: number = 1; // Current page number
  pageSize: number = 20; // Page size
  totalItems: number = 0;
  live: boolean = true;
  loading: boolean = true;

  constructor(
    private usersService: UsersService
 
  ) {}

  ngOnInit(): void {
    // this.dashboard();
    this.loadData();
  }


  loadData() {
    const filters = {}; 
  
    this.usersService
      .getAllUsers(this.p, this.pageSize, filters)
      .subscribe(
        (response) => {
          this.loading = false;
          this.userData = response.users;
          this.totalItems = response.total; 
        },
        (error) => {
          console.error('Error fetching reports:', error);
          this.loading = false;
        }
      );
  }
  
}
