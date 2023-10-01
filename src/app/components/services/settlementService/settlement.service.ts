import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private http: HttpClient, private datePipe : DatePipe) { }

  dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getAllSettlement(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      WalletNumber?: number;
      TransactionId?: number;
      MerchantId?: number;
      Cleared?: boolean;
      StartDate?: Date;
      EndDate?: Date;
    
   
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
  
    if (filters.WalletNumber) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }

  
    if (filters.Cleared !== undefined) {
      queryParams = queryParams.set('Cleared', filters.Cleared.toString());
    }
  
  
    if (filters.TransactionId) {
      queryParams = queryParams.set('TransactionId', filters.TransactionId.toString());
    }
  
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
    return this.http.get(`${environment.baseUrl}/transactions/value-dated`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  
  downloadAllSettlement(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      WalletNumber?: number;
      TransactionId?: number;
      MerchantId?: number;
      Cleared?: boolean;
      StartDate?: Date;
      EndDate?: Date;
    
   
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
  
    if (filters.WalletNumber) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }

  
    if (filters.Cleared !== undefined) {
      queryParams = queryParams.set('Cleared', filters.Cleared.toString());
    }
  
  
    if (filters.TransactionId) {
      queryParams = queryParams.set('TransactionId', filters.TransactionId.toString());
    }
  
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
    return this.http.get(`${environment.baseUrl}/transactions/value-dated-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  regularise(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/value-dated-transactions/regularize`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

}
