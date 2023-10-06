import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LienService } from 'src/app/components/services/lienService/lien.service';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';
import { RoleService } from 'src/app/components/services/roleService/role.service';
import { UsersService } from 'src/app/components/services/userManagement/users.service';

@Component({
  selector: 'app-update-lien',
  templateUrl: './update-lien.component.html',
  styleUrls: ['./update-lien.component.css']
})
export class UpdateLienComponent {

  selectedDetails: any;
  usersData: any;

  constructor(
    private userService: UsersService,
    private notification: ToastrService,
    private roleService: RoleService,
    private lienService: LienService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {

  }

  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
      console.log('details', this.selectedDetails);
    }
  }


  updateLien() {
    this.spinner.show();
    const payload = {
    lienReference: this.selectedDetails.lienReference,
    validUntil: this.selectedDetails.validUntil,
    eventLienAmount: this.selectedDetails.lienAmount,
    requestedBy: this.selectedDetails.requestedBy,
    walletId: this.selectedDetails.walletId
    }
    this.lienService.updateLien(payload).subscribe(
      (res) => {
        this.usersData = res;
        if(this.usersData){
          this.notification.success('Sucess');
          // console.log('role', this.usersData.roles);
          this.spinner.hide();
          // this.userService.closeModal();
          location.reload();
        } else {
          this.notification.error('an error occured');
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error enabling user:', error);
        this.notification.error(error.error.responseMessage || error.error.message);
        this.spinner.hide();
      }
    );
  }



  unblock() {
    this.spinner.show();
    const payload = {
    lienReference: this.selectedDetails.lienReference,
    validUntil: this.selectedDetails.validUntil,
    eventLienAmount: this.selectedDetails.eventLienAmount,
    requestedBy: this.selectedDetails.requestedBy,
    walletId: this.selectedDetails.walletId
    }
    this.lienService.unblockAndDebit(payload).subscribe(
      (res) => {
        this.usersData = res;
        if(this.usersData){
          this.notification.success( this.usersData.responseMessage);
       
          this.spinner.hide();
         
          location.reload();
        } else {
          this.notification.error(this.usersData.responseMessage);
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error enabling user:', error);
        this.notification.error(error.error.responseMessage || error.errors.message);
        this.spinner.hide();
      }
    );
  }

  transformDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

}
