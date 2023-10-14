import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/components/services/transactionService/transactions.service';

@Component({
  selector: 'app-cross-currency',
  templateUrl: './cross-currency.component.html',
  styleUrls: ['./cross-currency.component.css']
})
export class CrossCurrencyComponent {

  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      debitWalletNumber: ['', Validators.required],
      creditWalletNumber: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      rate: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      chargeAmount: ['', Validators.required],
      narration: ['', Validators.required]
    });
  }


  submit() {
    if (this.transactionForm.valid) {
      this.spinner.show();
  

  
      this.transactionService.crossCurrency(this.transactionForm.value).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.transactionForm.reset();
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
