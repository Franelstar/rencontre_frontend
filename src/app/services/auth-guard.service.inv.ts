import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardInv implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (
      !localStorage.getItem('access_token')
    ) { return true; }
    this.router.navigate(['/home']).then();
    return false;
  }
}
