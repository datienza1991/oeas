import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', user.token),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
