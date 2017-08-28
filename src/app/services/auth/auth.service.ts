import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { IAuthCurrentUserRequest, IAuthCurrentUserResponse, ILoginRequest, ILoginResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface IAuthService {
  login(options: ILoginRequest): Observable<ILoginResponse>;
  logOut(): void;
  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse>;
}

@Injectable()
export class AuthService implements IAuthService {

  constructor(private http: HttpClient) {}

  login(options: ILoginRequest): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`/api/auth/login`, options )
      .map(response => {
        localStorage.setItem('rememberMe', options.rememberMe.toString());
        const storeService = options.rememberMe ? localStorage : sessionStorage;
        storeService.setItem('token', response.token);
        storeService.setItem('user', JSON.stringify(response.user));
        return response;
      });
  }

  logOut(): void {
    const storeService = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
    storeService.removeItem('token');
    storeService.removeItem('user');
    location.href = '/login';
  }

  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    return this.http
      .get<IAuthCurrentUserResponse>(`/api/auth/user`);
  }
}
