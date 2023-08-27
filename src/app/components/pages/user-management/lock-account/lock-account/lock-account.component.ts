import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lock-account',
  templateUrl: './lock-account.component.html',
  styleUrls: ['./lock-account.component.css']
})
export class LockAccountComponent {

  form!: FormGroup;
  selectedDetails: any

  constructor(private fb: FormBuilder, private userService: UsersService, private spinner: NgxSpinnerService, private notification : ToastrService,    private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      endDate: ['', Validators.required],
    });


  }

  
  @Input() set selected(data: any) {
    if (data) {
      this.selectedDetails = data;
    }
  }

  submit() {
    if (this.form.valid) {
      this.spinner.show();
     
      const formattedEndDate = this.datePipe.transform(this.form.value.endDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');

      const payload = {
        email: this.selectedDetails.email,
        endDate: formattedEndDate,
      };
      
      this.userService.lockAccount(payload).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.form.reset();
            this.spinner.hide();
            location.reload();
          } else {
            this.notification.error(response.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error(error.error.responseMessage || error.error.message);
          this.spinner.hide();
        }
      );
    } else {
      this.notification.error('Please fill in all fields.');
      this.spinner.hide();
    }
  }
}


