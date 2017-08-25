import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs/Subject';

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private _destroyed$ = new Subject<boolean>();
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _fb: FormBuilder,
              private _actions$: Actions, ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [true],
    });
  }

  ngOnInit(): void {
    this._actions$
      .ofType(authAction.ActionTypes.LOGIN_SUCCESS)
      .takeUntil(this._destroyed$)
      .do(() => this._router.navigate(['/']))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this._store.dispatch(new authAction.LoginAction(this.loginForm.value));
    }
  }

}
