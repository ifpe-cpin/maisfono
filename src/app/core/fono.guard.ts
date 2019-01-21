import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable()
export class FonoGuard implements CanActivate {
  constructor(private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{

      let roles = localStorage.getItem('roles');
      let list = roles.split(",")

      if(!list.includes('fono')){

        console.log('access denied')
        return false;
      }

      return true;

  }
}
