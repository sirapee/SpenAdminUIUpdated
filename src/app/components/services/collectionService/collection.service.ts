import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient, private datePipe : DatePipe) { }

  dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getAllCollections(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      VirtualAccountNumber?: number;
      SourceAccountNumber?: number;
      MerchantReference?: string;
      CreditPosted?: boolean;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
      MerchantId?: number;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('page', PageNumber.toString())
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
  
    if (filters.SourceAccountNumber) {
      queryParams = queryParams.set('SourceAccountNumber', filters.SourceAccountNumber.toString());
    }
  
    if (filters.MerchantReference) {
      queryParams = queryParams.set('MerchantReference', filters.MerchantReference);
    }
  
    if (filters.CreditPosted !== undefined) {
      queryParams = queryParams.set('CreditPosted', filters.CreditPosted.toString());
    }
  
    if (filters.TransactionReference) {
      queryParams = queryParams.set('TransactionReference', filters.TransactionReference);
    }
  
    if (filters.VirtualAccountNumber) {
      queryParams = queryParams.set('VirtualAccountNumber', filters.VirtualAccountNumber.toString());
    }
  
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
    return this.http.get(`${environment.baseUrl}/virtual-accounts/collections`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  

  downloadAllCollections(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      VirtualAccountNumber?: number;
      SourceAccountNumber?: number;
      MerchantReference?: string;
      CreditPosted?: boolean;
      StartDate?: Date;
      EndDate?: Date;
      TransactionReference?: string;
      MerchantId?: number;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('page', PageNumber.toString())
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
  
    if (filters.SourceAccountNumber) {
      queryParams = queryParams.set('SourceAccountNumber', filters.SourceAccountNumber.toString());
    }
  
    if (filters.MerchantReference) {
      queryParams = queryParams.set('MerchantReference', filters.MerchantReference);
    }
  
    if (filters.CreditPosted !== undefined) {
      queryParams = queryParams.set('CreditPosted', filters.CreditPosted.toString());
    }
  
    if (filters.TransactionReference) {
      queryParams = queryParams.set('TransactionReference', filters.TransactionReference);
    }
  
    if (filters.VirtualAccountNumber) {
      queryParams = queryParams.set('VirtualAccountNumber', filters.VirtualAccountNumber.toString());
    }
  
    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }
  
    return this.http.get(`${environment.baseUrl}/virtual-accounts/collections-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }
  

}
