import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private selectedDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedDetails$: Observable<any> = this.selectedDetailsSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any[]>([]);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    this.userDataSubject.next(data);
  }

  constructor(private http: HttpClient, private datePipe : DatePipe) { }


  getAllUsers(
    PageNumber: number,
    PageSize: number,
    filters: {
      merchantId?: number;
      merchantName?: string;
      phoneNumber?: number;
      email?: string;
      state?: string;
      createdAt?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('PageNumber', PageNumber.toString())
      .set('PageSize', PageSize.toString());

    if (filters.phoneNumber !== undefined) {
      queryParams = queryParams.set('PhoneNumber', filters.phoneNumber.toString());
    }
    if (filters.merchantName) {
      queryParams = queryParams.set('MerchantName', filters.merchantName);
    }
    if (filters.state) {
      queryParams = queryParams.set('State', filters.state);
    }

    if (filters.merchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.merchantId.toString());
    }

    if (filters.email) {
      queryParams = queryParams.set('Email', filters.email);
    }

    if (filters.createdAt) {
      queryParams = queryParams.set('CreatedAt', this.dateToString(filters.createdAt));
    }

    return this.http.get(`${environment.baseUrl}/merchants`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

 dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getUserDetails(userId: any) {
    return this.http.get(`${environment.baseUrl}/merchant/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }).pipe(
      tap((res: any) => {
        this.selectedDetailsSubject.next(res.data); 
      })
    );
  }

  delete(id: any) {
    return this.http.delete(`${environment.baseUrl}/merchant/${id}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  undelete(id: any) {
    return this.http.get(`${environment.baseUrl}/merchant/undelete/${id}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  updateUser(id:any,payload: any) {
    return this.http.patch(`${environment.baseUrl}/merchant/${id}`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  createMerchant(payload: any) {
    return this.http.post(`${environment.baseUrl}/merchants`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  updateCharge(payload: any) {
    return this.http.post(`${environment.baseUrl}/merchant/client-charge`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }
}
