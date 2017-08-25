import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ILoginRequest, ILoginResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { IAuthCurrentUserRequest, IAuthCurrentUserResponse } from '../../../../server/models/api';

export interface IAuthService {
  login(options: ILoginRequest): Observable<ILoginResponse>;
  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse>;
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
        localStorage.setItem('rememberMe', options.rememberMe.toString());
        const storeService = options.rememberMe ? localStorage : sessionStorage;
        storeService.setItem('token', body.token);
        storeService.setItem('user', JSON.stringify(body.user));
        return body;
      });
  }

  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    const storeService = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', storeService.getItem('token'));

    return this.http
      .get(`/api/auth/user`, { headers, withCredentials: true })
      .map(response => response.json());
  }
}
