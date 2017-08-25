import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const storeService = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
    req = req.clone({
      headers: req.headers.set('x-auth-token', storeService.getItem('token'))
    });
    return next.handle(req);
  }
}

