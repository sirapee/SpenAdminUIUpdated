import { Component } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { walletService } from 'src/app/components/services/wallet/wallet.service';

@Component({
  selector: 'app-internal-wallets',
  templateUrl: './internal-wallets.component.html',
  styleUrls: ['./internal-wallets.component.css'],
})
export class InternalWalletsComponent {
  currency: any;
  searchTerm!: string;

  sortTransaction!: string;

  selectedDateRange!: Date;
  currentPage: number = 1;
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

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    // private payoutService: PayoutService,
    private walletService: walletService,
    private merchantService: MerchantService,
    config: NgbPaginationConfig
  ) {
    config.size = 'sm';
  }

  ngOnInit(): void {
    this.loadData();
    this.loadMerchant();
  }

  loadData() {
    this.spinner.show();

    const filters: {
      // Id?: number;
      // walletName?: number;
      Currency?: string;
      // ProviderReference?: string;
      // status?: boolean;
      // MerchantId?: number;
      // createdAt?: Date;
      // EndDate?: Date;
      // TransactionReference?: string;
    } = {};

    if (this.currency) {
      filters.Currency = this.currency;
    }

    this.walletService.getAllInternalWallets(this.p, this.pageSize,filters).subscribe(
      (response) => {
        this.loading = false;
        this.userData = response.wallets;
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

  clearLoadData() {
    this.spinner.show();

    const filters: {
      // Id?: number;
      // walletName?: number;
      Currency?: string;
      // ProviderReference?: string;
      // status?: boolean;
      // MerchantId?: number;
      // createdAt?: Date;
      // EndDate?: Date;
      // TransactionReference?: string;
    } = {};

    this.walletService.getAllInternalWallets(this.p, this.pageSize,filters).subscribe(
      (response) => {
        this.loading = false;
        this.userData = response.wallets;
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
    const selectedItem = this.userData.find(
      (item: { id: any }) => item.id === id
    );
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
          walletNumber
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          beneficiaryAccountName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          amount
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
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
