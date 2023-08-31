import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class KycDocumentService {

  constructor(private http: HttpClient) {}


  getMerchants() {
    return this.http.get(`${environment.baseUrl}/merchants-no-filter`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  getDocumentsForOrganization(orgId:any){
    return this.http.get(`${environment.baseUrl}/merchant/${orgId}/documents`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  delete(documentId: any) {
    return this.http.delete(`${environment.baseUrl}/merchant/documents/${documentId}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  
  authorize(payload: any) {
    return this.http.post(`${environment.baseUrl}/merchant/approve-reject-kyc`, payload , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }
}
