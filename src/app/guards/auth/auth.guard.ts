import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    return this._authService.getCurrentUser()
      .map(user => !!user)
      .catch(() => {
        this._router.navigate(['/login']);
        return of(false);
      });
  }
}
