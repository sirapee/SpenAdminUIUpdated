import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  closeModal() {
    let el: any = document.getElementsByClassName('btn-close');
    for (let i = 0; i < el.length; i++) {
      el[i].click();
    }
  }
  
  getProviders() {
    return this.http.get(`${environment.baseUrl}/providers`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }


  delete(id: any) {
    return this.http.delete(`${environment.baseUrl}/provider/${id}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  createProviders(payload: any) {
    return this.http.post(`${environment.baseUrl}/providers`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  defaultProviders( id: any, payload: any,) {
    return this.http.post(`${environment.baseUrl}/set-default-providers/${id}`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  getProviderType() {
    return this.http.get(`${environment.baseUrl}/provider-types`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }
}
