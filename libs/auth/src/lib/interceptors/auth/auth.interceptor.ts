import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { first, map, mergeMap, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../+state/auth.reducer';
import { getUser } from '../../+state/auth.selectors';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router : Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });
    return next.handle(req).pipe(tap(
      {
        error:(err) => {
          console.log(err.error.code);
          this.router.navigate(['/auth/login']);
        }
      }
    ));
  }
}
