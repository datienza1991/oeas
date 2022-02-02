import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthActionTypes } from './auth.actions';
import * as authActions from './auth.actions';
import { AuthService } from './../services/auth/auth.service';
import { User } from '@batstateu/data-models';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthData } from './auth.reducer';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      fetch({
        run: (action) => {
          const store = this.store;
          this.authService.login(action['payload']).subscribe({
            next(user: User) {
              store.dispatch(authActions.loginSuccess({ payload: user }));
            },
          });
        },
        onError: (action, error) => {
          return authActions.loginFailure(error);
        },
      })
    )
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => {
          this.router.navigate([`/dashboard`]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        tap(() => {
          this.router.navigate([`/auth/login`]);
          localStorage.clear();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthData>
  ) {}
}
