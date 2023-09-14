import { Component } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css'],
})
export class MerchantsComponent {
  searchTerm!: string;

  sortTransaction!: string;

  userData: any;
  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Page size
  totalItems!: number;
  live: boolean = true;
  loading: boolean = true;
  userDetail: any;
  selectedDetails: any = null;
  filteredUserData: any;

  sortBy: string = '';
  sortOrder: string = 'asc';
  activeSortBy: string = ''; // Initialize activeSortBy property

  constructor(
    private merchantService: MerchantService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    config: NgbPaginationConfig
  ) {
    config.size = 'sm';
  }

  ngOnInit(): void {
    // this.usersService.userData$.subscribe((data) => {
    //   this.userData = data;
    // });
    this.loadData();
  }

  loadData() {
    this.spinner.show();

    const filters = {};

    // Log the request payload
    console.log('Request Payload:', {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      filters: filters,
    });

    this.merchantService
      .getAllUsers(this.currentPage, this.pageSize, filters)
      .subscribe(
        (response) => {
          this.loading = false;
          this.userData = response.organizations;
          this.filteredUserData = this.userData;
          // this.userData.slice();
          this.merchantService.updateUserData(this.filteredUserData);
          this.spinner.hide();
          this.totalItems = response.totalCount;
        },
        (error) => {
          console.error('Error fetching reports:', error);
          this.loading = false;
          this.spinner.hide();
        }
      );
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;

    this.loadData();
  }
  // onSearchInputChange(): void {
  //   this.search(this.searchTerm);
  // }

  search(): void {
    if (this.searchTerm !== '') {
      this.filteredUserData = this.userData.filter((result: any) => {
        // Add null checks before accessing properties for filtering
        // const username = result.username || '';
        const email = result.email || '';
        const firstName = result.firstName || '';
        const lastName = result.lastName || '';
        const merchantName = result.merchantName || '';

        return (
          // username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          merchantName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
      this.sort();
    } else {
      this.filteredUserData = this.userData.slice();
    }
  }

  // Sort function
  sort(property?: string): void {
    if (property) {
      if (this.activeSortBy === property) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.activeSortBy = property;
        this.sortOrder = 'asc';
      }
    }

    // Use a cast to 'asc' | 'desc' to address the TypeScript type error
    this.filteredUserData = _.orderBy(
      this.filteredUserData,
      [this.activeSortBy],
      [this.sortOrder as 'asc' | 'desc']
    );
  }

  getSortIcon(property: string): string {
    if (this.activeSortBy === property) {
      return this.sortOrder === 'asc'
        ? 'feather ft-arrow-up'
        : 'feather ft-arrow-down';
    }
    return '';
  }

  userDetails() {
    // const filters = {};
    const userId = this.userData.id;
    this.merchantService.getUserDetails(userId).subscribe(
      (response) => {
        // this.loading = false;
        this.userDetail = response.user;
        this.merchantService.getUserDetails(this.userDetail);
        // this.totalItems = response.total;
      },
      (error) => {
        console.error('Error fetching reports:', error);
        // this.loading = false;
      }
    );
  }

  viewDetails(details: any) {
    this.selectedDetails = details;
  }

  // confirmEnableUser(username: string) {
  //   Swal.fire({
  //     title: 'Enable User',
  //     text: `You are about to enable this user, do you want to continue?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Enable',
  //     cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.enableUser(username);
  //     }
  //   });
  // }

  // enableUser(username: string) {
  //   this.spinner.show();
  //   this.usersService.enable(username).subscribe(
  //     (res: any) => {
  //       this.notification['success'](res.responseMessage, 'User Enabled');
  //       this.spinner.hide();
  //       location.reload();

  //     },
  //     (error) => {
  //       console.error('Error enabling user:', error);
  //       this.notification['error'](
  //         'An error occurred while enabling the user.'
  //       );
  //       this.spinner.hide();
  //     }
  //   );
  // }

  // confirmDisableUser(username: string) {
  //   Swal.fire({
  //     title: 'Disable User',
  //     text: `You are about to disable this user, do you want to continue?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Disable',
  //     cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.disableUser(username);
  //     }
  //   });
  // }

  // disableUser(username: string) {
  //   this.spinner.show();
  //   this.usersService.disable(username).subscribe(
  //     (res: any) => {
  //       this.notification['success'](res.responseMessage, 'User disabled');
  //       this.spinner.hide();
  //       location.reload();
  //     },
  //     (error) => {
  //       console.error('Error disabling user:', error);
  //       this.notification['error'](
  //         'An error occurred while disabling the user.'
  //       );
  //       this.spinner.hide();
  //     }
  //   );
  // }

  confirmDeleteUser(username: string) {
    Swal.fire({
      title: 'Disable Merchant',
      text: `You are about to disable this merchant, do you want to continue?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Disable',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(username);
      }
    });
  }

  deleteUser(username: string) {
    this.spinner.show();
    this.merchantService.delete(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'merchant disabled');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error disabling user:', error);
        this.notification['error'](
          'An error occurred while disabling the merchant.'
        );
        this.spinner.hide();
      }
    );
  }

  confirmEnableUser(username: string) {
    Swal.fire({
      title: 'Enable Merchant',
      text: `You are about to enable this Merchant, do you want to continue?`,
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
    this.spinner.show();
    this.merchantService.undelete(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'Merchant Enabled');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error enabling Merchant:', error);
        this.notification['error'](
          'An error occurred while enabling the Merchant.'
        );
        this.spinner.hide();
      }
    );
  }
}
