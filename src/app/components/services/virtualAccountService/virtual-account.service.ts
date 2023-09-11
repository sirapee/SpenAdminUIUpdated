import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class VirtualAccountService {

  constructor(private http: HttpClient, private datePipe : DatePipe) { }

 dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getAllVirtualAccounts(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      StartDate?: Date;
      EndDate?: Date;
      AccountNumber?: number;
      Bank?: string;
      MerchantId?: number; // Make it optional
      Provider?: string;
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
  

    if (filters.AccountNumber) {
      queryParams = queryParams.set('AccountNumber', filters.AccountNumber.toString());
    }

    if (filters.Bank) {
      queryParams = queryParams.set('Bank', filters.Bank);
    }

    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }

    if (filters.Provider) {
      queryParams = queryParams.set('Provider', filters.Provider);
    }

    return this.http.get(`${environment.baseUrl}/virtual-accounts/all`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  
  downloadAllVirtualAccounts(
    PageNumber: number,
    PageSize: number,
    filters: {
      Id?: number;
      StartDate?: Date;
      EndDate?: Date;
      AccountNumber?: number;
      Bank?: string;
      MerchantId?: number; // Make it optional
      Provider?: string;
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
  

    if (filters.AccountNumber) {
      queryParams = queryParams.set('AccountNumber', filters.AccountNumber.toString());
    }

    if (filters.Bank) {
      queryParams = queryParams.set('Bank', filters.Bank);
    }

    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }

    if (filters.Provider) {
      queryParams = queryParams.set('Provider', filters.Provider);
    }

    return this.http.get(`${environment.baseUrl}/virtual-accounts/all-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }
}
