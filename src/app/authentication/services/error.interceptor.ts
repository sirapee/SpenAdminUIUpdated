import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

import { TokenService } from './token.service';
import { JarwisService } from './jarwis.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private jarwis: JarwisService,
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1),
      catchError(this.handleError.bind(this))
    );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.tokenService.logout();
    }
    return throwError(error);
  }

}

export const UseErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
