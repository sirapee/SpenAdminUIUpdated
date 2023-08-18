import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  canActivate(): boolean {
    if ( this.auth.loggedInUser() ) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
