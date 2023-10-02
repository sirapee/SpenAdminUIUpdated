import { Component } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VirtualAccountService } from 'src/app/components/services/virtualAccountService/virtual-account.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as XLSX from 'xlsx';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { CollectionService } from 'src/app/components/services/collectionService/collection.service';
import { PayoutService } from 'src/app/components/services/payoutService/payout.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {


  searchTerm!: string;

  sortTransaction!: string;

  selectedDateRange!: Date;

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
  providerName: any;
  // CreditPosted: any;
  processedSuccessfully: any;
  processedSuccessfullyy: boolean | undefined;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private payoutService: PayoutService,
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
      Id?: number;
      SourceWalletNumber?: number;
      BeneficiaryAccountNumber?: number;
      MerchantId?: number;
      ProviderReference?: string;
      ProcessedSuccessfully?: boolean;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
   
    } = {}

    if (this.selectedStartDate) {
      filters.StartDate = this.selectedStartDate;
    }

    if (this.selectedEndDate) {
      filters.EndDate = this.selectedEndDate;
    }
 
  

    this.payoutService
      .getAllTransfer(this.p, this.pageSize, filters)
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

  clearLoadData() {
    this.spinner.show();

    const filters: {
      Id?: number;

   
    } = {}



    this.payoutService
      .getAllTransfer(this.p, this.pageSize, filters)
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


  processedData() {
    this.spinner.show();

    const filters: {
      Id?: number;
      SourceWalletNumber?: number;
      BeneficiaryAccountNumber?: number;
      MerchantId?: number;
      ProviderReference?: string;
      ProcessedSuccessfully?: boolean;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
   
    } = {}

    if (this.processedSuccessfullyy) {
      filters.ProcessedSuccessfully = this.processedSuccessfullyy;
    }

    this.payoutService
      .getAllTransfer(this.p, this.pageSize, filters)
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
        const sourceWalletName = result.sourceWalletName || '';
        const sourceWalletNumber = result.sourceWalletNumber || '';
        const beneficiaryAccountName = result.beneficiaryAccountName || '';
        const amount = result.amount || '';
        const status = result.transactionStatus || '';

        return (
          // username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          sourceWalletName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          sourceWalletNumber.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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






downloadData() {
  this.spinner.show();


  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

 const filters: {
    Id?: number;
    SourceWalletNumber?: number;
    BeneficiaryAccountNumber?: number;
    MerchantId?: number;
    ProviderReference?: string;
    ProcessedSuccessfully?: boolean;
    StartDate?: Date;
    EndDate?: Date;
    TransactionReference?: string;
 
  } = {}

  if (this.selectedStartDate) {
    filters.StartDate = this.selectedStartDate;
  } else {
    
    filters.StartDate = thirtyDaysAgo;
  }

  if (this.selectedEndDate) {
    filters.EndDate = this.selectedEndDate;
  }

  this.payoutService
    .downloadAllTransfer(this.p, this.pageSize, filters)
    .subscribe(
      (response) => {
        this.loading = false;
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
