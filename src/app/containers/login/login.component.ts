import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs/Subject';

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';
import * as errorAction from '../../store/error/error.actions';
import { Subscription } from 'rxjs/Subscription';

export interface ILoginComponent {
  login(): void;
  removeError(err: Error): void;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, ILoginComponent {
  errors$: Observable<Error[]>;
  loginForm: FormGroup;
  private _destroyed$ = new Subject<boolean>();
  private _errors: Error[];
  private _errorsSubscription: Subscription;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _fb: FormBuilder,
              private _actions$: Actions) {
    this.errors$ = this._store.select(fromRoot.getErrors);
    this._errorsSubscription = this.errors$.subscribe(errors => this._errors = errors);
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
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
    this._errorsSubscription.unsubscribe();
  }

  login(): void {
    // TODO: make custom error and filter with name
    this._errors.forEach(err => this._store.dispatch(new errorAction.ErrorRemoveAction(err)))
    if (this.loginForm.dirty && this.loginForm.valid) {
      this._store.dispatch(new authAction.LoginAction(this.loginForm.value));
    }
  }

  removeError(err: Error): void {
    this._store.dispatch(new errorAction.ErrorRemoveAction(err));
  }
}
