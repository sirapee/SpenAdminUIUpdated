import { Component } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/components/services/dashboardService/dashboard.service';
import { LienService } from 'src/app/components/services/lienService/lien.service';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { SettlementService } from 'src/app/components/services/settlementService/settlement.service';
import { TransactionsService } from 'src/app/components/services/transactionService/transactions.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

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
  usersData: any;
  walletNumber!: number;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    // private payoutService: PayoutService,

    private merchantService : MerchantService,
    private settlementService : SettlementService,
    private lienService : LienService,
    private transactionService: TransactionsService,
  
    config: NgbPaginationConfig
    ) {
  
        config.size = 'sm';
      
    }

  ngOnInit(): void {

  this.loadData();

  }




loadData() {
  this.spinner.show();

  const filters: {
    Id?: string;
    WalletNumber?: number;
    TransactionId?: number;
    TransactionType?: string;
    PartTransactionType?: string;
    EnteredBy?: string;
    MerchantId?: number;
    StartDate?: Date;
    EndDate?: Date;
    TransactionReference?: string;
} = {};


  if (this.walletNumber) {
    filters.WalletNumber = this.walletNumber;
  }

  if (this.selectedStartDate) {
    filters.StartDate = this.selectedStartDate;
  }

  if (this.selectedEndDate) {
    filters.EndDate = this.selectedEndDate;
  }




  this.transactionService
    .getAllTransactions(this.p, this.pageSize, filters)
    .subscribe( 
      (response) => {
        this.loading = false;
        this.userData = response.transactions;
        this.filteredUserData = this.userData;
        // this.userData.slice();
        this.lienService.updateUserData(this.filteredUserData);
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
    Id?: string;
    WalletNumber?: number;
    TransactionId?: number;
    TransactionType?: string;
    PartTransactionType?: string;
    EnteredBy?: string;
    MerchantId?: number;
    StartDate?: Date;
    EndDate?: Date;
    TransactionReference?: string;
} = {};



  this.transactionService
    .getAllTransactions(this.p, this.pageSize, filters)
    .subscribe( 
      (response) => {
        this.loading = false;
        this.userData = response.transactions;
        this.filteredUserData = this.userData;
     
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



downloadData() {
  this.spinner.show();


  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filters: {
    Id?: string;
    WalletNumber?: number;
    TransactionId?: number;
    TransactionType?: string;
    PartTransactionType?: string;
    EnteredBy?: string;
    MerchantId?: number;
    StartDate?: Date;
    EndDate?: Date;
    TransactionReference?: string;
} = {};

  // if (this.selectedStartDate) {
  //   filters.LienExpiryDate = this.selectedStartDate;
  // } else {
    
  //   filters.LienExpiryDate = thirtyDaysAgo;
  // }

  // if (this.selectedEndDate) {
  //   filters.EndDate = this.selectedEndDate;
  // }

  this.transactionService
    .downloadAllTransactions(this.p, this.pageSize, filters)
    .subscribe(
      (response) => {
      
        this.userData = response.transactions;
        this.filteredUserData = this.userData;

        this.spinner.hide();
        this.totalItems = response.total;

      
        this.exportDataToExcel(this.filteredUserData);
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






viewDetailss(id: string) {
  const selectedItem = this.userData.find((item: { id: any; }) => item.id === id);
  if (selectedItem) {
    this.selectedItem = selectedItem;
    console.log(this.selectedItem);
  }
}

viewDetails(details: any) {
  this.selectedDetails = details;
}



search(): void {
  if (this.searchTerm !== '') {
    this.filteredUserData = this.userData.filter((result: any) => {
      // Add null checks before accessing properties for filtering
      // const username = result.username || '';
      const transactionAmount = result.transactionAmount || '';
      const walletNumber = result.walletNumber || '';
      const walletName = result.walletName || '';
      const transactionReference = result.transactionReference || '';
      const transactionCurrency = result.transactionCurrency || '';

      return (
        // username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transactionAmount.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        walletNumber.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        walletName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transactionReference.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transactionCurrency.toLowerCase().includes(this.searchTerm.toLowerCase())
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


// updateLien(id: number) {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You are about to update the lien. Do you want to proceed?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, update it!',
//     cancelButtonText: 'Cancel',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.spinner.show();
//       const payload = {
//         lienReference: this.selectedItem.lienReference,
//         validUntil: this.selectedItem.validUntil,
//         eventLienAmount: this.selectedItem.lienAmount,
//         requestedBy: this.selectedItem.requestedBy,
//         walletId: this.selectedItem.walletId
//       };

//       this.lienService.updateLien(payload).subscribe(
//         (res) => {
//           this.usersData = res;
//           Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'Lien updated successfully!',
//           }).then(() => {
//             this.spinner.hide();
//             location.reload();
//           });
//         },
//         (error) => {
//           console.error('Error updating lien:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'An error occurred while updating the lien details.',
//           });
//           this.spinner.hide();
//         }
//       );
//     }
//   });
// }



removeLien(lienReference: any, validUntil: any, lienAmount: any, requestedBy: any, walletId: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to remove lien!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      const requestObject = {
        lienReference: lienReference,
        validUntil: validUntil,
        eventLienAmount: lienAmount,
        requestedBy: requestedBy,
        walletId: walletId
      };

      this.performLienRemovalAction(requestObject);
    } else {
      Swal.fire('Removal cancelled', '', 'info');
    }
  });
}

performLienRemovalAction(requestObject: any) {
  this.spinner.show();

  this.lienService.updateLien(requestObject).subscribe(
    (response: any) => {
      this.spinner.hide();

      if (response.isSuccessful) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Lien Removal successful',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred',
          confirmButtonText: 'OK'
        });
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
    }
  );
}

}
