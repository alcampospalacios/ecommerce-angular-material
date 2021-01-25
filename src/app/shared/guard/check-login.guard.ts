import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationNodeService } from '../service/authentication-node.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService: AuthenticationNodeService, private router: Router) { }

  canActivate() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/home']);
      return false;
    }
    else
      return true;

  }
  
}
