import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedInUser()) {
      this.router.navigate(['main/dashboard']); // Redirect to dashboard or any other route
      return false;
    }
    return true;
  }
}
