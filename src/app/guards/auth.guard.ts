import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('name_user') ) {
      
      // console.log(localStorage.getItem('name_user'));
      return true;
    }
    this.router.navigate(['/auth/signin']);
    return false;
    // return true;
  }
}
