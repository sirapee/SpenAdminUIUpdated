import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LienService {

  private selectedDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedDetails$: Observable<any> = this.selectedDetailsSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any[]>([]);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    this.userDataSubject.next(data);
    console.log(this.userDataSubject);
  }

  constructor(private http: HttpClient, private datePipe : DatePipe) { }

  dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getAllLien(
    PageNumber: number,
    PageSize: number,
    filters: {
      LienId?: number;
      LienReference?: string;
      WalletNumber?: number;
      IsActive?: boolean;
      WalletId?: number;
      LienExpiryDate?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('pageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());
  
    if (filters.LienId !== undefined) {
      queryParams = queryParams.set('LienId', filters.LienId.toString());
    }
  
    if (filters.LienExpiryDate) {
      queryParams = queryParams.set('LienExpiryDate', this.dateToString(filters.LienExpiryDate));
    }
  
  
    if (filters.WalletNumber) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }

    if (filters.IsActive !== undefined) {
      queryParams = queryParams.set('IsActive', filters.IsActive.toString());
    }
  
    if (filters.WalletId) {
      queryParams = queryParams.set('WalletId', filters.WalletId.toString());
    }
  
    if (filters.LienReference) {
      queryParams = queryParams.set('LienReference', filters.LienReference);
    }
  
    return this.http.get(`${environment.baseUrl}/transactions/liens`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  downloadAllLien(
    PageNumber: number,
    PageSize: number,
    filters: {
      LienId?: number;
      LienReference?: string;
      WalletNumber?: number;
      IsActive?: boolean;
      WalletId?: number;
      LienExpiryDate?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('pageNumber', PageNumber.toString())
      .set('pageSize', PageSize.toString());
  
    if (filters.LienId !== undefined) {
      queryParams = queryParams.set('LienId', filters.LienId.toString());
    }
  
    if (filters.LienExpiryDate) {
      queryParams = queryParams.set('LienExpiryDate', this.dateToString(filters.LienExpiryDate));
    }
  
  
    if (filters.WalletNumber) {
      queryParams = queryParams.set('WalletNumber', filters.WalletNumber.toString());
    }

    if (filters.IsActive !== undefined) {
      queryParams = queryParams.set('IsActive', filters.IsActive.toString());
    }
  
    if (filters.WalletId) {
      queryParams = queryParams.set('WalletId', filters.WalletId.toString());
    }
  
    if (filters.LienReference) {
      queryParams = queryParams.set('LienReference', filters.LienReference);
    }
  
    return this.http.get(`${environment.baseUrl}/transactions/liens-download`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }


  
  updateLien(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/update-lien,operations-admin`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  createLien(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/add-lien`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  unblockAndDebit(payload: any) {
    return this.http.post(`${environment.baseUrl}/transactions/unblock-and-debit`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }



}