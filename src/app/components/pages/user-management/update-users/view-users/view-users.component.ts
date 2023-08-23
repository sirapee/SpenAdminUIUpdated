import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/components/services/userManagement/users.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  selectedDetails: any

constructor(
  private userService: UsersService
){}


  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
      // this.paymentType = data?.payroll.currencyTypes?.[0] || 'usdt';

      // this.formattedDate = this.formatDate(data.reportDate);
    }
  }

}
