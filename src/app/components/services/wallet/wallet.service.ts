import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class walletService {
  constructor(private http: HttpClient, private datePipe : DatePipe) { }

  dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getAllWallets(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      WalletNumber?: number;
      Status?: boolean;
      MerchantId?: number;
      CreatedAt?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('pageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());
  
    if (filters.Id !== undefined) {
      queryParams = queryParams.set('Id', filters.Id.toString());
    }

    if (filters.WalletNumber) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }

      
    if (filters.Status !== undefined) {
      queryParams = queryParams.set('Status', filters.Status.toString());
    }

    
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
  
  
    if (filters.CreatedAt) {
      queryParams = queryParams.set('CreatedAt', this.dateToString(filters.CreatedAt));
    }
  

    return this.http.get(`${environment.baseUrl}/wallets`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  

  downloadAllTransfer(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      SourceWalletNumber?: number;
      BeneficiaryAccountNumber?: number;
      MerchantId?: number;
      ProviderReference?: string;
      ProcessedSuccessfully?: boolean;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
   
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('pageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());
  
    if (filters.Id !== undefined) {
      queryParams = queryParams.set('Id', filters.Id.toString());
    }
  
    if (filters.StartDate) {
      queryParams = queryParams.set('StartDate', this.dateToString(filters.StartDate));
    }
  
    if (filters.EndDate !== undefined) {
      queryParams = queryParams.set('EndDate', this.dateToString(filters.EndDate));
    }
  
    if (filters.SourceWalletNumber) {
      queryParams = queryParams.set('SourceAccountNumber', filters.SourceWalletNumber.toString());
    }
  
    if (filters.ProviderReference) {
      queryParams = queryParams.set('MerchantReference', filters.ProviderReference);
    }
  
    if (filters.ProcessedSuccessfully !== undefined) {
      queryParams = queryParams.set('CreditPosted', filters.ProcessedSuccessfully.toString());
    }
  
    if (filters.TransactionReference) {
      queryParams = queryParams.set('TransactionReference', filters.TransactionReference);
    }
  
    if (filters.BeneficiaryAccountNumber) {
      queryParams = queryParams.set('VirtualAccountNumber', filters.BeneficiaryAccountNumber.toString());
    }
  
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
    return this.http.get(`${environment.baseUrl}/payouts/bank/transfers-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  createWallets(payload: any) {
    return this.http.post(`${environment.baseUrl}/wallets`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  createInternalWallets(payload: any) {
    return this.http.post(`${environment.baseUrl}/wallets-internal`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  
  getAllInternalWallets(
    // PageNumber: number,
    // PageSize: number,
    filters: {
      // Id?: number;
      Currency?: string;
      // Status?: boolean;
      // MerchantId?: number;
      // CreatedAt?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      // .set('pageNumber', PageNumber.toString())
      // .set('pageSize', PageSize.toString());
  
    // if (filters.Id !== undefined) {
    //   queryParams = queryParams.set('Id', filters.Id.toString());
    // }

    if (filters.Currency) {
      queryParams = queryParams.set('Currency', filters.Currency);
    }

      
    // if (filters.Status !== undefined) {
    //   queryParams = queryParams.set('ProcessedSuccessfully', filters.Status.toString());
    // }

    
    // if (filters.MerchantId !== undefined) {
    //   queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    // }
  
  
  
    // if (filters.CreatedAt) {
    //   queryParams = queryParams.set('CreatedAt', this.dateToString(filters.CreatedAt));
    // }
  

    return this.http.get(`${environment.baseUrl}/wallets-internal`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


}
