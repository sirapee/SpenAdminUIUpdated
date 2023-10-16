import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/components/services/transactionService/transactions.service';
import * as XLSX from 'xlsx';
import { walletService } from 'src/app/components/services/wallet/wallet.service';

@Component({
  selector: 'app-debit-credit',
  templateUrl: './debit-credit.component.html',
  styleUrls: ['./debit-credit.component.css']
})
export class DebitCreditComponent {
  transactionForm!: FormGroup;
  debitForm!: FormGroup;
  creditForm!: FormGroup;

  selectedStartDate!: Date;
  selectedEndDate!: Date;
  walletNumber: any;
  userData: any;


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

  selectedFile: File | null = null;

  documentForm!: FormGroup;
  isLoading: boolean = false;
  credwallets: any;
  allWalletsCredit: any;
  walletNumberDebit: any;
  allWalletsDebit: any;
  credwalletsNumber: any;
  walletCurrencies: any;
  rates: any;
  debitCurrencies: any;

  constructor(private fb: FormBuilder,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService,
    private walletService: walletService) {}

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
    this?.subscribeToTransactionCurrencyChanges();

    this?.subscribeToTransactionCurrencyChangesDebit();
  }

  subscribeToTransactionCurrencyChanges() {
    this.creditForm.get('transactionCurrency')?.valueChanges.subscribe(currency => {
      if (currency) {
        this.getCurrencyPair();
      }
    });

  }


  subscribeToTransactionCurrencyChangesDebit() {
    this.debitForm.get('transactionCurrency')?.valueChanges.subscribe(currency => {
      if (currency) {
        this.getCurrencyPairs();
      }
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


  downloadData() {
    this.spinner.show();
  
    const filters: {

      StartDate?: Date;
      EndDate?: Date;
      
  } = {};
  
  

  
    if (this.selectedStartDate) {
      filters.StartDate = this.selectedStartDate;
    }
  
    if (this.selectedEndDate) {
      filters.EndDate = this.selectedEndDate;
    }
  
  
  
  
    this.transactionService
      .downloadStatement(this.walletNumber, filters)
      .subscribe( 
        (response) => {
       
          this.userData = response.transactions;
       
       
          this.spinner.hide();

          
          this.exportDataToExcel(this.userData);
       
        },
        (error) => {
          console.error('Error fetching reports:', error);
    
          this.spinner.hide();
        }
      );
  }


  
  
  exportDataToExcel(data: any[]) {
    if (!data || data.length === 0) {
      console.error('Data is empty or undefined.');
      return;
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils?.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'Account Statement');
  }
  
  
  saveExcelFile(buffer: any, fileName: string) {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }



  
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    // Check if the file size exceeds 5MB
    if (file && file.size > 5 * 1024 * 1024) {
      console.error('File size exceeds 5MB. Please select a smaller file.');
    } else {
      this.isLoading = true;

      setTimeout(() => {
        this.selectedFile = file;
        this.isLoading = false;
      }, 2000);
    }
  }

  onSubmitFile(): void {
    if (this.selectedFile) {
      this.spinner.show();
  
      const formData = new FormData();
      formData.append('file', this.selectedFile); 
  
      this.transactionService.bulkPosting(formData).subscribe(
        (response) => {
        
          console.log('File uploaded successfully:', response);
          this.notification.success('File uploaded successfully');

          this.spinner.hide();
          location.reload();
        },
        (error) => {
        
          console.error('Error uploading file:', error);
          this.notification.error('Error uploading file:', error);
          this.spinner.hide();
        }
      );
    } else {
      console.error('No file selected.');
      this.notification.error('Error uploading file:');
    }
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
        this.notification.error('Failed to retrieve currency rates.');
      }
    );
    
  }


  // for credit modal


  getWalletDebit(){
    this.spinner.show();
    const wallet = this.walletNumberDebit;
    this.walletService.getWallets(wallet).subscribe((response: any) => {
     
      if (response) {
        this.spinner.hide();
        this.allWalletsDebit = response.data;
        this.walletName = this.allWallets.walletName;
        this.debitCurrencies = this.allWallets.walletCurrency;
        this.isFormValid = true;
      
      } else {
        this.spinner.hide();
        this.isFormValid = false;
        this.notification.error('Validation Unsuccessful');
      }
      
    })
  }

  getWalletCredit(){
    this.spinner.show();
    const cred = this.credwalletsNumber;
    this.walletService.getWallets(cred).subscribe((response: any) => {
      if (response){
        this.spinner.hide();
        this.creditWallets = response.data;
      this.creditWalletName = this.creditWallets?.walletName;
      this.walletCurrencies = this.creditWallets?.walletCurrency;
      this.isFormValid = true;
    } else {
      this.spinner.hide();
      this.isFormValid = false;
      this.notification.error('Validation Unsuccessful');
    }
    })
  }

  getCurrencyPairs() {
   
    this.spinner.show();
    const debit = this.debitCurrencies;
    const credit = this.walletCurrency;
  
    this.walletService.getCurrencyPair(debit, credit).subscribe(
      (response: any) => {
        console.log('API call successful');
        if (response) {
          this.currencyPair = response.data;
          this.rates = this.currencyPair.rate
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
}
