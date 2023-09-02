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
 
      if (state.url.includes('auth/setup-2fa')) {

        return true;
      } else {
     
        this.router.navigate(['main/dashboard']);
        return false;
      }
    }
  
    return true;
  }
  
  
  
  
  
  
}
