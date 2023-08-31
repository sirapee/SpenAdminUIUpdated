import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  token: any;

  constructor(private Token: TokenService, private http: HttpClient) {}

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  loggedInUser() {
    return sessionStorage.getItem('token');
  }

  // getSessionData(){
  //   const getToken: any = sessionStorage.getItem('token');
  //   const getRandomNo: any = sessionStorage.getItem('random');
  //   this.token = CryptoJS.AES.decrypt( getToken , getRandomNo).toString(CryptoJS.enc.Utf8)
  // }

  // passwordToken(data: any) {
  //   return this.http.get(
  //     `${environment.userUrl}/generatePasswordResetToken/${data}`
  //   );
  // }

  // forgotPassword(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.userUrl}/forgotPassword`,
  //     payload
  //   );
  // }

  // changePassword(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.userUrl}/change-password`,
  //     payload,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  // resendConfirmEmail(data: any) {
  //   return this.http.get(
  //     `${environment.userUrl}resendConfirmEmailLink/${data}`
  //   );
  // }

  // verifyToken(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.baseUrl}/user-management/verify-token`,
  //     payload
  //   );
  // }

  // passwordReset(mail: any) {
  //   return this.http.get(`${environment.userUrl}/password-reset/${mail}`);
  // }

  // validateToken(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.userUrl}/password-reset/validate-token`,
  //     payload
  //   );
  // }

  // resetPassword(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.userUrl}/password-reset/update-password`,
  //     payload
  //   );
  // }

  // getEnableToken(type: any) {
  //   return this.http.get(
  //     `${environment.baseUrl}/enable-2factor?twoFactorType=${type}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  // postEnableToken(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.baseUrl}/enable-2factor`,
  //     payload,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  validate2FactorToken(payload: any) {
    return this.http.post<any>(
      `${environment.baseUrl}/validate-2factor-token`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
  }

  setup2fa(twoFactorType: string) {
    const url = `${environment.baseUrl}/enable-2factor`;
  
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: {
        twoFactorType: twoFactorType,
      },
    });
  }

  enable2fa(payload: any) {
    return this.http.post<any>(
      `${environment.baseUrl}/enable-2factor`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
  }
  

  // disableTwofactor(payload: any) {
  //   return this.http.post<any>(
  //     `${environment.userUrl}/disable-2factor`,
  //     payload,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  // getEmailDisbaleToken() {
  //   return this.http.get(`${environment.userUrl}/send-otp`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //     },
  //   });
  // }

  // resendConfirmationEmail(username: string) {
  //   return this.http.get(
  //     `${environment.userUrl}/user-management/verify-token/resend/${username}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     }
  //   );
  // }

  getCurrentUser() {
    return this.http.get(`${environment.baseUrl}/user-details`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}
