import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/components/services/transactionService/transactions.service';

@Component({
  selector: 'app-debit-credit',
  templateUrl: './debit-credit.component.html',
  styleUrls: ['./debit-credit.component.css']
})
export class DebitCreditComponent {
  transactionForm!: FormGroup;
  debitForm!: FormGroup;
  creditForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService) {}

  ngOnInit() {


    this.creditForm = this.fb.group({
      debitWalletNumber: ['', Validators.required],
      creditWalletNumber: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      rate: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      chargeAmount: ['', Validators.required],
      narration: ['', Validators.required]
    });  
    
    this.debitForm = this.fb.group({
      debitWalletNumber: ['', Validators.required],
      creditWalletNumber: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      rate: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      chargeAmount: ['', Validators.required],
      narration: ['', Validators.required]
    });

  }


    debitWallet() {
    if (this.debitForm.valid) {
      this.spinner.show();
  

  
      this.transactionService.debitWallet(this.debitForm.value).subscribe(
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


  
  creditWallet() {
    if (this.creditForm.valid) {
      this.spinner.show();
  

  
      this.transactionService.creditWallet(this.creditForm.value).subscribe(
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
