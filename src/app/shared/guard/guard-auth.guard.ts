import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationNodeService } from './../service/authentication-node.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthenticationNodeService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

  canLoad() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
