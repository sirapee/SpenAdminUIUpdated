import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/components/services/transactionService/transactions.service';
import { walletService } from 'src/app/components/services/wallet/wallet.service';

@Component({
  selector: 'app-trans-debit',
  templateUrl: './trans-debit.component.html',
  styleUrls: ['./trans-debit.component.css']
})
export class TransDebitComponent {

  allWallets: any;
  // walletNumber!: number;
  // creditWallet: any;
  creditWallets: any;
  walletName: any;
  creditWalletName: any;
  isFormValid = false;
  walletCurrency: any;
  debitCurrency: any;
  currencyPair: any;
  rate: any;
  credwallets: any;
  walletNumber: any;

  debitForm!: FormGroup;


  constructor(private fb: FormBuilder,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService,
    private walletService: walletService) {}

  ngOnInit() {


 
    
    this.debitForm = this.fb.group({
      debitWalletNumber: ['', Validators.required],
      creditWalletNumber: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      rate: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      chargeAmount: ['', Validators.required],
      narration: ['', Validators.required]
    });
  

    this?.subscribeToTransactionCurrencyChangesDebit();
  }



  


  subscribeToTransactionCurrencyChangesDebit() {
    this.debitForm.get('transactionCurrency')?.valueChanges.subscribe(currency => {
      if (currency) {
        this.getCurrencyPair();
      }
    });
    
  }



  // for debit modal
  getWallet(){
    this.spinner.show();
    const wallet = this.walletNumber;
    this.walletService.getWallets(wallet).subscribe((response: any) => {
     
      if (response) {
        this.spinner.hide();
        this.allWallets = response.data;
        this.walletName = this.allWallets?.walletName;
        this.debitCurrency = this.allWallets?.walletCurrency;
        this.isFormValid = true;
      
      } else {
        this.spinner.hide();
        this.isFormValid = false;
        this.notification.error('Validation Unsuccessful');
      }
      
    })
  }

  getCreditWallet(){
    this.spinner.show();
    const cred = this.credwallets;
    this.walletService.getWallets(cred).subscribe((response: any) => {
      if (response){
        this.spinner.hide();
        this.creditWallets = response.data;
      this.creditWalletName = this.creditWallets?.walletName;
      this.walletCurrency = this.creditWallets?.walletCurrency;
      this.isFormValid = true;
    } else {
      this.spinner.hide();
      this.isFormValid = false;
      this.notification.error('Validation Unsuccessful');
    }
    })
  }

  getCurrencyPair() {
   
    this.spinner.show();
    const debit = this.debitCurrency;
    const credit = this.walletCurrency;
  
    this.walletService.getCurrencyPair(debit, credit).subscribe(
      (response: any) => {
        console.log('API call successful');
        if (response) {
          this.currencyPair = response.data;
          this.rate = this.currencyPair.rate
        } else {
          console.error(response.responseMessage);
          this.notification.error('Failed to retrieve currency rates.');
        }
        this.spinner.hide();
      },
      (error) => {
        console.error('API Error:', error);
        this.spinner.hide();
        this.notification.error('An error occurred while fetching currency rates.');
      }
    );
    
  }


  debitWallet() {
    if (this.debitForm.valid) {
      this.spinner.show();
  

  
      this.transactionService.debitWallet(this.debitForm.value).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.debitForm.reset();
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
