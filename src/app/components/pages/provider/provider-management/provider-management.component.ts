import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/components/services/providerService/provider.service';
// import { RoleService } from 'src/app/components/services/roleService/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrls: ['./provider-management.component.css']
})
export class ProviderManagementComponent {


  searchTerm!: string;

  userData: any;
  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Page size
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

  providerForm! : FormGroup
  providerType: any;

  constructor(
    private providerService: ProviderService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    config: NgbPaginationConfig
  ) {
    config.size = 'sm';
  }

  ngOnInit(): void {
    this.getProvider();
    this.getProviderType();

    this.providerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      channel: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  getProvider() {
    this.spinner.show();
    this.providerService.getProviders().subscribe(
      (res:any) => {
        this.loading = false;
        this.role = res.providers;
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

  getProviderType() {
    // this.spinner.show();
    this.providerService.getProviderType().subscribe(
      (res:any) => {
        this.loading = false;
        this.providerType = res.channels;
        // this.filteredUserData = this.providerType;
        this.spinner.hide();
      },
      (error) => {
        // console.error('Error fetching roles:', error);
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getProvider();
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
            roleCategory
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            roleDescription
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
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

    this.filteredUserData.roles = _.orderBy(
      this.filteredUserData.roles,
      [property],
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

  confirmDeleteUser(username: string) {
    Swal.fire({
      title: 'Delete Provider',
      text: `You are about to delete this provider, do you want to continue?`,
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

  deleteUser(id: string) {
  
    this.spinner.show();
    this.providerService.delete(id).subscribe(
      (res: any) => {
       
        if (res && res.isSuccessful) {

          this.notification.success(res.responseMessage);
          this.spinner.hide();
        
          this.getProvider()
        } else {
      
          this.notification.error(res.responseMessage);
        }
      },
      (error) => {
        
        this.notification['error'](
          error.error.responseMessage || error.error.message
        );
      }
    );
  }


  submit() {
    
    if (this.providerForm.valid) {
      this.spinner.show();
      this.providerService.createProviders(this.providerForm.value).subscribe(
        (response: any) => {
          // this.spinner.show();
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.providerForm.reset();
            this.getProvider();
            this.spinner.hide();
            // location.reload();
            this.getProvider();
            this.providerService.closeModal();
          } else {
            this.notification.error(response.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error(error.error.responseMessage || error.error.message);
          // console.error('Organization creation error:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.notification.error('Please fill in all fields.');
      this.spinner.hide();
    }
  }


  confirmMakeDefault(id: string) {
    Swal.fire({
      title: 'Make Default',
      text: `You are about to make this your default provider, do you want to continue?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.makeDefault(id);
      }
    });
  }

  makeDefault(id: string) {
    const payload = id;
    this.spinner.show();
    this.providerService.defaultProviders(payload,id).subscribe(
      (res: any) => {

        if (res && res.isSuccessful) {
        
          this.notification.success(res.responseMessage);
          this.spinner.hide();
     
          location.reload();
        } else {
         
          this.notification.error(res.responseMessage);
        }
      },
      (error) => {
        this.notification['error'](
          error.error.responseMessage || error.error.message
        );
      }
    );
  }



}
