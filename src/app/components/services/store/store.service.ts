import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }


  setUserDetails(userDetails: any): void {
    sessionStorage.setItem('user', JSON.stringify(userDetails));
  }

  getUserDetails(): any {
    const userDetails: any = sessionStorage.getItem('user');
    return JSON.parse(userDetails);
  }

  clearUserDetails(): void {
    sessionStorage.removeItem('user');
  }
}
