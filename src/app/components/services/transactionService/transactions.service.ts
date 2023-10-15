import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private selectedDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedDetails$: Observable<any> = this.selectedDetailsSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any[]>([]);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    this.userDataSubject.next(data);
  }

  constructor(
    private http: HttpClient, private datePipe : DatePipe
  ) { }

  private dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }



  getAllTransactions(
    PageNumber: number,
    PageSize: number,
    // PageNumber: number,
    // PageSize: number,
    filters: {
      Id?: string;
      WalletNumber?: number;
      TransactionId?: number;
      TransactionType?: string;
      PartTransactionType?: string;
      EnteredBy?: string;
      MerchantId?: number;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('PageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());

    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }

    if (filters.Id) {
      queryParams = queryParams.set('Id', filters.Id);
    }

    if (filters.WalletNumber ) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }
  

    if (filters.TransactionType) {
      queryParams = queryParams.set('TransactionType', filters.TransactionType);
    }

    if (filters.PartTransactionType) {
      queryParams = queryParams.set('PartTransactionType', filters.PartTransactionType);
    }

    if (filters.EnteredBy) {
      queryParams = queryParams.set('EnteredBy', filters.EnteredBy);
    }

    if (filters.TransactionReference) {
      queryParams = queryParams.set('TransactionReference', filters.TransactionReference);
    }

    if (filters.StartDate) {
      queryParams = queryParams.set('StartDate', this.dateToString(filters.StartDate));
    }

    if (filters.EndDate) {
      queryParams = queryParams.set('EndDate', this.dateToString(filters.EndDate));
    }

    return this.http.get(`${environment.baseUrl}/transactions/all`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  
  downloadAllTransactions(
    PageNumber: number,
    PageSize: number,
    // PageNumber: number,
    // PageSize: number,
    filters: {
      Id?: string;
      WalletNumber?: number;
      TransactionId?: number;
      TransactionType?: string;
      PartTransactionType?: string;
      EnteredBy?: string;
      MerchantId?: number;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('PageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());

    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }

    if (filters.Id) {
      queryParams = queryParams.set('Id', filters.Id);
    }

    if (filters.WalletNumber ) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }
  

    if (filters.TransactionType) {
      queryParams = queryParams.set('TransactionType', filters.TransactionType);
    }

    if (filters.PartTransactionType) {
      queryParams = queryParams.set('PartTransactionType', filters.PartTransactionType);
    }

    if (filters.EnteredBy) {
      queryParams = queryParams.set('EnteredBy', filters.EnteredBy);
    }

    if (filters.TransactionReference) {
      queryParams = queryParams.set('TransactionReference', filters.TransactionReference);
    }

    if (filters.StartDate) {
      queryParams = queryParams.set('StartDate', this.dateToString(filters.StartDate));
    }

    if (filters.EndDate) {
      queryParams = queryParams.set('EndDate', this.dateToString(filters.EndDate));
    }

    return this.http.get(`${environment.baseUrl}/transactions/all-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  crossCurrency(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/post/cross-currency`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  debitWallet(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/debit-wallet`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  creditWallet(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/fund-wallet`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }



  downloadStatement(
      walletNumber: number,
    filters: {
      StartDate?: Date;
      EndDate?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('walletNumber', walletNumber.toString())
     


    if (filters.StartDate) {
      queryParams = queryParams.set('startDate', this.dateToString(filters.StartDate));
    }

    if (filters.EndDate) {
      queryParams = queryParams.set('endDate', this.dateToString(filters.EndDate));
    }

    return this.http.get(`${environment.baseUrl}/transactions/view-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  bulkPosting(payload:any){
    return this.http.post(`${environment.baseUrl}/bulk-processing/bulk-posting/file-upload`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }
}

