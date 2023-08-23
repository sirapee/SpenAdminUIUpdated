import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private selectedDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedDetails$: Observable<any> = this.selectedDetailsSubject.asObservable();

  constructor(private http: HttpClient, private datePipe : DatePipe) {}

  getAllUsers(
    pageNumber: number,
    pageSize: number,
    filters: {
      userId?: number;
      employeeId?: string;
      firstName?: string;
      lastName?: string;
      merchantName?: string;
      state?: string;
      isEnabled?: boolean;
      userType?: string;
      merchantId?: number;
      middleName?: string;
      createdAt?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (filters.userId !== undefined) {
      queryParams = queryParams.set('UserId', filters.userId.toString());
    }

    if (filters.employeeId) {
      queryParams = queryParams.set('EmployeeId', filters.employeeId);
    }

    if (filters.firstName) {
      queryParams = queryParams.set('FirstName', filters.firstName);
    }

    if (filters.lastName) {
      queryParams = queryParams.set('LastName', filters.lastName);
    }

    if (filters.merchantName) {
      queryParams = queryParams.set('MerchantName', filters.merchantName);
    }

    if (filters.state) {
      queryParams = queryParams.set('State', filters.state);
    }

    if (filters.isEnabled !== undefined) {
      queryParams = queryParams.set('IsEnabled', filters.isEnabled.toString());
    }

    if (filters.userType) {
      queryParams = queryParams.set('UserType', filters.userType);
    }

    if (filters.merchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.merchantId.toString());
    }

    if (filters.middleName) {
      queryParams = queryParams.set('MiddleName', filters.middleName);
    }

    if (filters.createdAt) {
      queryParams = queryParams.set('CreatedAt', this.dateToString(filters.createdAt));
    }

    return this.http.get(`${environment.baseUrl}/user-management/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }

  private dateToString(date: Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }


  getUserDetails(userId: any) {
    return this.http.get(`${environment.baseUrl}/user-management/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }).pipe(
      tap((res: any) => {
        this.selectedDetailsSubject.next(res.data); // Emit the fetched user details
      })
    );
  }


  searchUsers(
    pageNumber: number,
    pageSize: number,
    filters: {
      searchTerm?: string;
    }
  ): Observable<any> {
    // Filter out undefined and null values from filters
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null)
    );
  
    // Build queryParams based on the filtered filters
    let queryParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    if (filteredFilters['searchTerm']) {
      queryParams = queryParams.set('SearchTerm', filteredFilters['searchTerm']);
    }
  
    // Make the HTTP request with the constructed queryParams
    return this.http.get(`${environment.baseUrl}/user-management/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }
  
}