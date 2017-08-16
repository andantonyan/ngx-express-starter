import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import * as fromRoot from '../../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _store: Store<fromRoot.State>,
              private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    // return this._authService.getCurrentUser()
    //   .map(user => !!user)
    //   .catch(() => {
    //     this._router.navigate(['/join']);
    //     return of(false);
    //   });
  }
}
