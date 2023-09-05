import { Component } from '@angular/core';
import { UsersService } from '../../../services/userManagement/users.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VirtualAccountService } from 'src/app/components/services/virtualAccountService/virtual-account.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-virtual-accounts',
  templateUrl: './virtual-accounts.component.html',
  styleUrls: ['./virtual-accounts.component.css'],
})
export class VirtualAccountsComponent {
  searchTerm!: string;

  sortTransaction!: string;

  selectedDateRange!: Date;

  userData: any;
  p: number = 1; // Current page number
  pageSize: number = 10; // Page size
  totalItems: number = 0;
  live: boolean = true;
  loading: boolean = true;
  userDetail: any;
  selectedDetails: any = null;
  filteredUserData: any;
  // live: boolean = true;
  sortBy: string = '';
  sortOrder: string = 'asc';
  activeSortBy: string = ''; // Initialize activeSortBy property
  bsConfig: Partial<BsDatepickerConfig>;

  selectedStartDate!: Date;
  selectedEndDate!: Date;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private virtualAccountService: VirtualAccountService
  ) {
    this.bsConfig = {
      containerClass: 'theme-default',
    };
  }

  ngOnInit(): void {

    this.loadData();

  }

  loadData() {
    this.spinner.show();

    // Construct the filters object based on user input
    const filters: {
      Id?: number;
      StartDate?: Date;
      EndDate?: Date;
      AccountNumber?: number;
      Bank?: string;
      MerchantId?: number | undefined;
      Provider?: string;
    } = {};

    if (this.selectedStartDate) {
      filters.StartDate = this.selectedStartDate;
    }

    if (this.selectedEndDate) {
      filters.EndDate = this.selectedEndDate;
    }

    this.virtualAccountService
      .getAllVirtualAccounts(this.p, this.pageSize, filters)
      .subscribe(
        (response) => {
          this.loading = false;
          this.userData = response.accounts;
          this.filteredUserData = this.userData;
          // this.userData.slice();
          this.usersService.updateUserData(this.filteredUserData);
          this.spinner.hide();
          this.totalItems = response.total;
        },
        (error) => {
          console.error('Error fetching reports:', error);
          this.loading = false;
          this.spinner.hide();
        }
      );
  }


  search(): void {
    if (this.searchTerm !== '') {
      this.filteredUserData = this.userData.filter((result: any) => {
        // Add null checks before accessing properties for filtering
        // const username = result.username || '';
        const accountName = result.accountName || '';
        const accountNumber = result.accountNumber || '';
        const bank = result.bank || '';
        const category = result.category || '';

        return (
          // username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          accountName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          accountNumber.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bank.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          category.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    this.usersService.getUserDetails(userId).subscribe(
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

  viewDetails(details: any) {
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
    this.spinner.show();
    this.usersService.enable(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'User Enabled');
        this.spinner.hide();
        location.reload();

        // You can update your data source or perform other necessary actions here
      },
      (error) => {
        console.error('Error enabling user:', error);
        this.notification['error'](
          'An error occurred while enabling the user.'
        );
        this.spinner.hide();
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
    this.spinner.show();
    this.usersService.disable(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'User disabled');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error disabling user:', error);
        this.notification['error'](
          'An error occurred while disabling the user.'
        );
        this.spinner.hide();
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
    this.spinner.show();
    this.usersService.delete(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'User deleted');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.notification['error'](
          'An error occurred while deleting the user.'
        );
        this.spinner.hide();
      }
    );
  }

  confirmUnlockUser(email: string) {
    Swal.fire({
      title: 'Unlock User',
      text: `You are about to unlock this user, do you want to continue?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Unlock',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.unlockUser(email);
      }
    });
  }

  unlockUser(email: string) {
    this.spinner.show();
    this.usersService.unlock(email).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'User Unlocked ');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error unlocking user:', error);
        this.notification.error(
          error.error.responseMessage || error.error.message
        );
        this.spinner.hide();
      }
    );
  }




downloadData() {
  this.spinner.show();


  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filters: {
    Id?: number;
    StartDate?: Date;
    EndDate?: Date;
    AccountNumber?: number;
    Bank?: string;
    MerchantId?: number | undefined;
    Provider?: string;
  } = {};

  if (this.selectedStartDate) {
    filters.StartDate = this.selectedStartDate;
  } else {
    
    filters.StartDate = thirtyDaysAgo;
  }

  if (this.selectedEndDate) {
    filters.EndDate = this.selectedEndDate;
  }

  this.virtualAccountService
    .getAllVirtualAccounts(this.p, this.pageSize, filters)
    .subscribe(
      (response) => {
        this.loading = false;
        this.userData = response.accounts;
        this.filteredUserData = this.userData;
        // this.userData.slice();
        // this.usersService.updateUserData(this.filteredUserData);
        this.spinner.hide();
        this.totalItems = response.total;

        // Export the data to Excel
        this.exportDataToExcel(this.userData);
      },
      (error) => {
        console.error('Error fetching reports:', error);
        this.loading = false;
        this.spinner.hide();
      }
    );
}

exportDataToExcel(data: any[]) {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile(excelBuffer, 'exported-data');
}

saveExcelFile(buffer: any, fileName: string) {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

}
