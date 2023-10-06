import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LienService } from 'src/app/components/services/lienService/lien.service';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { SettlementService } from 'src/app/components/services/settlementService/settlement.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';

@Component({
  selector: 'app-add-lien',
  templateUrl: './add-lien.component.html',
  styleUrls: ['./add-lien.component.css']
})
export class AddLienComponent {

  lienForm!: FormGroup;

  currentPage: number = 1; // Current page number
  pageSize: number = 100;
  merchantData: any;

  constructor(
    private usersService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    // private payoutService: PayoutService,

    private merchantService : MerchantService,
    private settlementService : SettlementService,
    private fb: FormBuilder,
    private lienService : LienService,
    config: NgbPaginationConfig
    ) {
  
        config.size = 'sm';
      
    }

  ngOnInit(): void {

    this.lienForm =
     this.fb.group({
      walletNumber: ['', Validators.required],
      lienAmount: [''],
      lienReference: [''],
      validUntil: [null],
      lienRemarks: [''],
      requestedBy: ['']
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
    if (this.lienForm.valid) {
      this.spinner.show();
  

  
      this.lienService.createLien(this.lienForm.value).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.lienForm.reset();
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
