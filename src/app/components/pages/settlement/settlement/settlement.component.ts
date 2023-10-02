import { Component } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { SettlementService } from 'src/app/components/services/settlementService/settlement.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { walletService } from 'src/app/components/services/wallet/wallet.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DashboardService } from 'src/app/components/services/dashboardService/dashboard.service';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent {

    
  searchTerm!: string;

  sortTransaction!: string;

  selectedDateRange!: Date;
  currentPage : number = 1;
  size: number = 100;
  userData: any;
  p: number = 1; // Current page number
  pageSize: number = 10; // Page size
  totalItems!: number;
  live: boolean = true;
  loading: boolean = true;
  userDetail: any;
  selectedDetails: any = null;
  filteredUserData: any;
  // live: boolean = true;
  sortBy: string = '';
  sortOrder: string = 'asc';
  activeSortBy: string = ''; // Initialize activeSortBy property


  selectedStartDate!: Date;
  selectedEndDate!: Date;
  selectedItem: any;
  Provider: any;
  selectedProvider: any;
  filteredData: any;
  merchantName: any;
  // CreditPosted: any;
  // processedStatus: any;
  processedStatus: boolean | undefined;
  merchantData: any;
  currency!: string;
  dashboardData: any;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    // private payoutService: PayoutService,
    private walletService : walletService,
    private merchantService : MerchantService,
    private settlementService : SettlementService,
    private dashboardService : DashboardService,
    config: NgbPaginationConfig
    ) {
  
        config.size = 'sm';
      
    }

  ngOnInit(): void {


    this.dashboardService.dashboard().subscribe((res: any) => {
      this.dashboardData = res;
 
    });

    this.loadData();
    this.loadMerchant();


  }

  getBalanceByStatus(status: string): string {
    if (this.dashboardData && this.dashboardData.settlementSummary) {
      const summaryItem = this.dashboardData.settlementSummary.find((item: { transactionStatus: string; }) => item.transactionStatus === status);
      return summaryItem ? (summaryItem.totalBalance || 0).toFixed(2) : '0.00';
    }
    return '0.00';
  }


  

  loadData() {
    this.spinner.show();

    const filters: {
      Id?: number;
      walletName?: number;
      walletNumber?: number;
      Currency?: string;
      // ProviderReference?: string;
      Cleared?: boolean;
      MerchantId?: number;
      createdAt?: Date;
      // EndDate?: Date;
      // TransactionReference?: string;
   
    } = {}

    if (this.processedStatus) {
      filters.Cleared = this.processedStatus;
    }

    // if (this.merchantName) {
    //   filters.MerchantId = this.merchantName;
    // }

    // if (this.currency) {
    //   filters.Currency = this.currency;
    // }
 
  

    this.settlementService
      .getAllSettlement(this.p, this.pageSize, filters)
      .subscribe( 
        (response) => {
          this.loading = false;
          this.userData = response.transactions;
          this.filteredUserData = this.userData;
          // this.userData.slice();
          this.usersService.updateUserData(this.filteredUserData);
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

  clearLoadData() {
    this.spinner.show();

    const filters: {
      Id?: number;

   
    } = {}



    this.settlementService
      .getAllSettlement(this.p, this.pageSize, filters)
      .subscribe( 
        (response) => {
          this.loading = false;
          this.userData = response.transactions;
          this.filteredUserData = this.userData;
          // this.userData.slice();
          this.usersService.updateUserData(this.filteredUserData);
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
    this.p = newPage;

    this.loadData();


  }



  

  regularizeWithSweetAlert(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to regularize this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, regularize it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const requestObject = {
          id: id
          // Add other properties if required by the API
        };
  
        this.performRegularizeAction(requestObject);
      } else {
        Swal.fire('Regularization Cancelled', '', 'info');
      }
    });
  }
  
  performRegularizeAction(requestObject: any) {
    this.spinner.show();
  
    this.settlementService.regularise(requestObject).subscribe(
      (response: any) => {
        this.spinner.hide();
  
        if (response.isSuccessful) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.responseMessage,
            confirmButtonText: 'OK'
          });
          // Handle additional success action if needed
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: response.responseMessage,
            confirmButtonText: 'OK'
          });
          // Handle additional error action if needed
        }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.error.responseMessage || error.error.message,
          confirmButtonText: 'OK'
        });
        // Handle additional error action if needed
      }
    );
  }
  
  
    
  


  downloadData() {
    this.spinner.show();
  
  
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    const filters: {
      Id?: number;
      walletName?: number;
      walletNumber?: number;
      // ProviderReference?: string;
      Status?: boolean;
      MerchantId?: number;
      StartDate?: Date;
      EndDate?: Date;
      // TransactionReference?: string;
   
    } = {}
  
    if (this.selectedStartDate) {
      filters.StartDate = this.selectedStartDate;
    } else {
      
      filters.StartDate = thirtyDaysAgo;
    }
  
    if (this.selectedEndDate) {
      filters.EndDate = this.selectedEndDate;
    }
  
    this.settlementService
      .downloadAllSettlement(this.p, this.pageSize, filters)
      .subscribe(
        (response) => {
          // this.loading = false;
          this.userData = response.transactions;
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
    if (!data || data.length === 0) {
      console.error('Data is empty or undefined.');
      return;
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils?.json_to_sheet(data);
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



  loadMerchant() {
    this.spinner.show();

    const filters = {};

    // Log the request payload
  

    this.merchantService
      .getAllUsers(this.currentPage, this.size, filters)
      .subscribe(
        (response) => {
          // this.loading = false;
          this.merchantData = response.organizations;
          // this.filteredUserData = this.userData;
          // this.userData.slice();
          // this.merchantService.updateUserData(this.filteredUserData);
          this.spinner.hide();
          // this.totalItems = response.totalCount;
        },
        (error) => {
          console.error('Error fetching reports:', error);
          // this.loading = false;
          this.spinner.hide();
        }
      );
  }


  viewDetails(id: string) {
    const selectedItem = this.userData.find((item: { id: any; }) => item.id === id);
    if (selectedItem) {
      this.selectedItem = selectedItem;
      console.log(this.selectedItem);
    }
  }
  


  search(): void {
    if (this.searchTerm !== '') {
      this.filteredUserData = this.userData.filter((result: any) => {
        // Add null checks before accessing properties for filtering
        // const username = result.username || '';
        const walletName = result.walletName || '';
        const walletNumber = result.walletNumber || '';
        const beneficiaryAccountName = result.beneficiaryAccountName || '';
        const amount = result.walletBalance || '';
        const status = result.transactionStatus || '';

        return (
          // username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          walletName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          walletNumber.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          beneficiaryAccountName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          amount.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          status.toLowerCase().includes(this.searchTerm.toLowerCase())
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

}
