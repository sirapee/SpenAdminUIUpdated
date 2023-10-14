import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { walletService } from 'src/app/components/services/wallet/wallet.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent {

  addForm!: FormGroup;

  currentPage: number = 1; // Current page number
  pageSize: number = 100;
  merchantData: any;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    // private payoutService: PayoutService,
    private walletService : walletService,
    private merchantService : MerchantService,
    private fb: FormBuilder,
    config: NgbPaginationConfig
    ) {
  
        config.size = 'sm';
      
    }

  ngOnInit(): void {

    this.addForm =
     this.fb.group({
      walletName: ['',  Validators.required],
      merchantId: ['', Validators.required],
      walletOwnership: ['merchant'],
      walletCurrency: ['',  Validators.required],
      // status: [''],
    });

    this.loadMerchant();

  }


  
  loadMerchant() {
    this.spinner.show();

    const filters = {};

    // Log the request payload
  

    this.merchantService
      .getAllUsers(this.currentPage, this.pageSize, filters)
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


  submit() {
    if (this.addForm.valid) {
      this.spinner.show();
  
      // const payload = {
      //   phoneNumber: this.addOrganizationform.value.phoneNumber,
      //   rcNumber: this.addOrganizationform.value.rcnumber,
      //   merchantName: this.addOrganizationform.value.merchantName,
      //   email: this.addOrganizationform.value.email,
   
      //   firstname: this.addOrganizationform.value.firstname,
      //   businessCategory: this.addOrganizationform.value.businessCategory,
      //   businessType: this.addOrganizationform.value.businessType,
      //   lastname: this.addOrganizationform.value.lastname,
      //   role: this.addOrganizationform.value.role
        

      // };
  
      this.walletService.createWallets(this.addForm.value).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.addForm.reset();
            this.spinner.hide();
            location.reload();
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
      this.notification.error('Please fill in all required fields.');
      this.spinner.hide();
    }
  }

}
