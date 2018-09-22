  import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from './auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class FonoGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.user.pipe(
           take(1),
           map(user => user && user.roles.includes('fono')?true:false),
           tap(isFono => {
             if (!isFono) {
               console.log('access denied')
               this.router.navigate(['']);
             }else{
               console.log(state.url)
             }
         })
    )
  }
}
