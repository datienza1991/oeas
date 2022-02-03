import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../+state/auth.reducer';
import { getUser } from '../../+state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getUser).pipe(
      first(),
      mergeMap(token => {
        const authReq = token?.token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : req;
        return next.handle(authReq);
      }),
    );
    
  }
}
