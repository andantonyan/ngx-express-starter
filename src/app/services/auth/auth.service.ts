import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ILoginRequest, ILoginResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { IAuthCurrentUserRequest, IAuthCurrentUserResponse } from '../../../../server/models/api';
import { HttpClient } from '@angular/common/http';

export interface IAuthService {
  login(options: ILoginRequest): Observable<ILoginResponse>;
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

  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    return this.http
      .get<IAuthCurrentUserResponse>(`/api/auth/user`);
  }
}
