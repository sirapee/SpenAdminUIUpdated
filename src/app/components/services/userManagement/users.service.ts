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

  private userDataSubject = new BehaviorSubject<any[]>([]);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    this.userDataSubject.next(data);
  }

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




  createUser(payload: any) {
    return this.http.post(`${environment.baseUrl}/user-management/users`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  createAdmin(payload: any) {
    return this.http.post(`${environment.baseUrl}/user-management/admins`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  createOrganization(payload: any) {
    return this.http.post(`${environment.baseUrl}/user-management/organizations`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  updateUser(id:any,payload: any) {
    return this.http.patch(`${environment.baseUrl}/user-management/users/${id}`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  closeModal() {
    let el: any = document.getElementsByClassName('btn-close');
    for (let i = 0; i < el.length; i++) {
      el[i].click();
    }
  }
  
  getAllMerchants(
    PageNumber: number,
    PageSize: number,
    // PageNumber: number,
    // PageSize: number,
    filters: {
      MerchantId?: number;
      MerchantName?: string;
      PhoneNumber?: number; // Make it optional
      Email?: string;
      state?: string;
      CreatedAt?: Date;
    }
  ): Observable<any> {
    let queryParams = new HttpParams()
      .set('page', PageNumber.toString())
      .set('pageSize', PageSize.toString());

    if (filters.MerchantId !== undefined) {
      queryParams = queryParams.set('MerchantId', filters.MerchantId.toString());
    }

    if (filters.MerchantName) {
      queryParams = queryParams.set('MerchantName', filters.MerchantName);
    }

    if (filters.PhoneNumber !== undefined) {
      queryParams = queryParams.set('PhoneNumber', filters.PhoneNumber.toString());
    }
  

    if (filters.Email) {
      queryParams = queryParams.set('Email', filters.Email);
    }

    if (filters.state) {
      queryParams = queryParams.set('State', filters.state);
    }

    if (filters.CreatedAt) {
      queryParams = queryParams.set('CreatedAt', this.dateToString(filters.CreatedAt));
    }

    return this.http.get(`${environment.baseUrl}/merchants`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: queryParams,
    });
  }





  enable(username: any) {
    return this.http.get(`${environment.baseUrl}/user-management/enable/${username}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  disable(username: any) {
    return this.http.get(`${environment.baseUrl}/user-management/disable/${username}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  delete(username: any) {
    return this.http.delete(`${environment.baseUrl}/user-management/user/${username}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  changeAdminPassword(payload:any) {
    return this.http.post(`${environment.baseUrl}/user-management/change-password`,payload,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  changeUserPassword(payload:any) {
    return this.http.post(`${environment.baseUrl}/user-management/change-user-password`,payload,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }
  
}