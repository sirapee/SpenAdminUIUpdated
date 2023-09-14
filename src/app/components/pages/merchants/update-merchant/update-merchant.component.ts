import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/components/services/roleService/role.service';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-merchant',
  templateUrl: './update-merchant.component.html',
  styleUrls: ['./update-merchant.component.css'],
})
export class UpdateMerchantComponent {
  selectedDetails: any;
  usersData: any;
  role: any;

  constructor(
    private userService: UsersService,
    private notification: ToastrService,
    private roleService: RoleService,
    private merchantService: MerchantService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getRole();
  }

  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
      console.log('details', this.selectedDetails);
    }
  }

  updateUser() {
    this.spinner.show();
    const payload = {
      phoneNumber: this.selectedDetails.phoneNumber,
      merchantName: this.selectedDetails.merchantName,
      email: this.selectedDetails.email,
      state: this.selectedDetails.state,
      businessCategory: this.selectedDetails.businessCategory,
      businessType: this.selectedDetails.businessType,
      city: this.selectedDetails.city,
      rcNumber: this.selectedDetails.rcNumber,
      country: this.selectedDetails.country,
      address: this.selectedDetails.address,
    };
    this.merchantService.updateUser(this.selectedDetails.id, payload).subscribe(
      (res) => {
        this.usersData = res;
        if (this.usersData.isSuccessful) {
          this.notification.success(this.usersData.responseMessage);
          console.log('role', this.usersData.roles);
          this.spinner.hide();
          // this.userService.closeModal();
          location.reload();
        } else {
          this.notification.error(this.usersData.responseMessage);
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error enabling user:', error);
        this.notification.error(
          'An error occurred while updating the merchant details.'
        );
        this.spinner.hide();
      }
    );
  }

  getRole() {
    this.roleService.getRoles().subscribe(
      (res) => {
        this.role = res;
      },
      (error) => {
        // console.error('Error fetching roles:', error);
      }
    );
  }

  updateCharge() {
    this.spinner.show();
    const payload = {
      id: this.selectedDetails.id,
      clientConfigurationId:
        this.selectedDetails.clientConfiguration.clientCharge
          .clientConfigurationId,
      plan: this.selectedDetails.clientConfiguration.clientCharge.plan,
      fundingCharge:
        this.selectedDetails.clientConfiguration.clientCharge.fundingCharge,
      monthlyMaintenanceFee:
        this.selectedDetails.clientConfiguration.clientCharge
          .monthlyMaintenanceFee,
      usdFundingMonthlyFee:
        this.selectedDetails.clientConfiguration.clientCharge
          .usdFundingMonthlyFee,
      isUsdFunding:
        this.selectedDetails.clientConfiguration.clientCharge.isUsdFunding,
      issuanceCharge:
        this.selectedDetails.clientConfiguration.clientCharge.issuanceCharge,
      topUpCharge:
        this.selectedDetails.clientConfiguration.clientCharge.topUpCharge,
      maxIssueCardAllowed:
        this.selectedDetails.clientConfiguration.clientCharge
          .maxIssueCardAllowed,
      allowCurrencyConversion:
        this.selectedDetails.clientConfiguration.clientCharge
          .allowCurrencyConversion,

      maxIssueCardAllowedPerCustomer:
        this.selectedDetails.clientConfiguration.clientCharge
          .maxIssueCardAllowedPerCustomer,
      virtualAccountCollectionCharge:
        this.selectedDetails.clientConfiguration.clientCharge
          .virtualAccountCollectionCharge,
      virtualAccountCollectionChargeCappedAt:
        this.selectedDetails.clientConfiguration.clientCharge
          .virtualAccountCollectionChargeCappedAt,
      cardCollectionCharge:
        this.selectedDetails.clientConfiguration.clientCharge
          .cardCollectionCharge,
      cardCollectionChargeCappedAt:
        this.selectedDetails.clientConfiguration.clientCharge
          .cardCollectionChargeCappedAt,
      ussdCollectionCharge:
        this.selectedDetails.clientConfiguration.clientCharge
          .ussdCollectionCharge,
      ussdCollectionChargeCappedAt:
        this.selectedDetails.clientConfiguration.clientCharge
          .ussdCollectionChargeCappedAt,
      bankTransferChargeIsStandard:
        this.selectedDetails.clientConfiguration.clientCharge
          .bankTransferChargeIsStandard,
      bankTransferChargeIsFlat:
        this.selectedDetails.clientConfiguration.clientCharge
          .bankTransferChargeIsFlat,
      bankTransferCharge:
        this.selectedDetails.clientConfiguration.clientCharge
          .bankTransferCharge,
      settlementWindowForCheckout:
        this.selectedDetails.clientConfiguration.clientCharge
          .settlementWindowForCheckout,
      applyRollingReserve:
        this.selectedDetails.clientConfiguration.clientCharge
          .applyRollingReserve,
      rollingReservePercentage:
        this.selectedDetails.clientConfiguration.clientCharge
          .rollingReservePercentage,
      virtualAccountCollectionChargeIsFlat:
        this.selectedDetails.clientConfiguration.clientCharge
          .virtualAccountCollectionChargeIsFlat,
    };

    this.merchantService.updateCharge(payload).subscribe(
      (res) => {
        this.usersData = res;
        if (this.usersData.isSuccessful) {
          this.notification.success(this.usersData.responseMessage);
          console.log('role', this.usersData.roles);
          this.spinner.hide();
          // this.userService.closeModal();
          location.reload();
        } else {
          this.notification.error(this.usersData.responseMessage);
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error updating charge:', error);
        this.notification.error('An error occurred while updating the charge.');
        this.spinner.hide();
      }
    );
  }
}
