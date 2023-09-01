import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedInUser = this.authService.loggedInUser();
  
    if (loggedInUser) {
      // User is logged in
      if (state.url.includes('auth/setup-2fa')) {
        // Allow access to setup-2fa page
        return true;
      } else {
        // Redirect to dashboard or any other route
        this.router.navigate(['main/dashboard']);
        return false;
      }
    }
  
    return true;
  }
  
  
  
  
  
  
}
