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
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserService } from '@batstateu/account';
import { NzModalService } from 'ng-zorro-antd/modal';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      fetch({
        run: (action) => {
          const store = this.store;
          const userService = this.userService;
          const modal = this.modal;
          this.authService.login(action['payload']).subscribe({
            next(user: User) {
              userService.get(user.id).subscribe({
                next: (userDetail) => {
                  if(userDetail !== undefined){
                    store.dispatch(authActions.loginSuccess({ payload: {id: userDetail.id, isActive: true, username: user.username, firstName: userDetail.firstName} }))
                  }else{
                    modal.warning({
                      nzTitle: 'Update your profile now!',
                      nzContent: `Please update your profile now so administrator can review and activate it!`,
                    });
                    store.dispatch(authActions.loginSuccessNewAccount({ payload: user }));
                  }
                },
                error: () => store.dispatch(authActions.loginSuccessNewAccount({ payload: user })),
              });
            },
            error: (er) =>{ console.log(er)}
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
    private modal: NzModalService
  ) {}
}
