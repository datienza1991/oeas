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
import { State } from './auth.reducer';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '@batstateu/account';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      fetch({
        run: (action) => {
          const store = this.store;
          const userService = this.userService;
          this.authService.login(action['payload']).subscribe({
            next(user: User) {
              userService.get(user.id).subscribe({
                next: (userDetail) =>
                  store.dispatch(authActions.loginSuccess({ payload: userDetail })),
                error: () => store.dispatch(authActions.loginSuccessNewAccount({ payload: user })),
              });
            },
          });
        },
        onError: (action, error) => {
          return authActions.loginFailure(error);
        },
      })
    )
  );

  navigateToDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => {
          this.router.navigate([`/dashboard`]);
        })
      ),
    { dispatch: false }
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccessNewAccount),
        tap(() => {
          this.router.navigate([`/account/profile`]);
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
          //Note: php session cookie cant delete on development
          this.cookieService.deleteAll();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>,
    private cookieService: CookieService
  ) {}
}
