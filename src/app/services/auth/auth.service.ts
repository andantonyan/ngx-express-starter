import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ILoginRequest, ILoginResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';

export interface IAuthService {
  login(options: ILoginRequest): Observable<ILoginResponse>;
}

@Injectable()
export class AuthService implements IAuthService {

  constructor(private http: Http) {}

  login(options: ILoginRequest): Observable<ILoginResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(`/api/auth/login`,
        options,
        { headers, withCredentials: true }
      )
      .map(response => response.json())
      .map(body => {
        localStorage.setItem('token', body.token);
        localStorage.setItem('user', body.user);
        return body;
      });
  }
}
