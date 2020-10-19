import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (localStorage.getItem('name')) {
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
