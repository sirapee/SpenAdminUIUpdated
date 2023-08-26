import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}


  getRoles() {
    return this.http.get(`${environment.baseUrl}/roles`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  delete(roleName: any) {
    return this.http.delete(`${environment.baseUrl}/role/${roleName}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  createRole(payload: any) {
    return this.http.post(`${environment.baseUrl}/roles`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

}
