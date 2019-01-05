  import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{

      let roles = localStorage.getItem('roles');
      let list = roles.split(",")

      return list.includes('admin');
      // return this.auth.user.pipe(
      //      take(1),
      //      map(user => user && user.roles.includes('admin')?true:false),
      //      tap(isAdmin => {
      //        if (!isAdmin) {
      //          console.log('access denied')
      //          this.router.navigate(['']);
      //        }else{
      //          console.log(state.url)
      //        }
      //    })
    //)
  }
}
