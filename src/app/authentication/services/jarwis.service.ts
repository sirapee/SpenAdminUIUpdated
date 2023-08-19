import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JarwisService {

  private storedOtp: string = '';
  
  constructor(private http: HttpClient) {}

  // signupuser(data: any) {
  //   return this.http.post(
  //     `${environment.baseUrl}/user-management/registration`,
  //     data
  //   );
  // }

  // signupcorporate(data: any) {
  //   return this.http.post(
  //     `${environment.baseUrl}/user-management/organization/registration`,
  //     data
  //   );
  // }

  login(payload: any) {
    return this.http.post(`${environment.baseUrl}/user-login`, payload);
  }

  // logout() {
  //   return this.http.post(
  //     `${environment.baseUrl}/user-logout`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  // refreshToken() {
  //   const payload = {
  //     refreshToken: sessionStorage.getItem('refreshToken'),
  //     token: sessionStorage.getItem('token'),
  //   };
  //   return this.http.post(
  //     `${environment.baseUrl}/session/refresh-token`,
  //     payload,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }


  verifyEmail(email: string, isAdmin: boolean) {
    const url = `${environment.baseUrl}/password-reset/${email}`;
    const params = { isAdmin: isAdmin.toString() }; // Convert boolean to string

    return this.http.get(url, { params });
  }

  resendOtp(username: any) {
    const url = `${environment.baseUrl}/resend-otp/${username}`;
    return this.http.get(url);
  }

  passwordReset(payload: any) {
    return this.http.post(`${environment.baseUrl}/password-reset/update-password`, payload);
  }


 

  // Store the OTP in the service
  setOtp(otp: string) {
    this.storedOtp = otp;
  }

  

  // Retrieve the stored OTP
  getStoredOtp() {
    return this.storedOtp;
  }

  clearUserData() {
    this.storedOtp = '';
  }
}
