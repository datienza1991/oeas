import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth/auth.service';
import { User } from '@batstateu/data-models';
import { forkJoin, of } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserService } from '@batstateu/account';
import { NzModalService } from 'ng-zorro-antd/modal';
import { authApiActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private modal: NzModalService,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authApiActions.login),
      exhaustMap((action) => {
        const { payload } = action;
        return this.authService.login(payload).pipe(
          catchError(() => of({} as User)),
          switchMap((user) => forkJoin([this.userService.get(user.id), of(user)])),
          filter((userDetail) => !!userDetail),
          map(([userDetail, user]) =>
            authApiActions.loginSuccess({
              payload: {
                id: user.id,
                isActive: userDetail.isActive,
                username: user.username,
                firstName: userDetail.firstName,
                userDetailId: userDetail.id,
                sectionId: userDetail.sectionId?.id || null,
                userType: userDetail.userType,
              },
            }),
          ),
        );
      }),
    ),
  );

  navigateToDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authApiActions.loginSuccess),
        tap(() => {
          this.router.navigate([`/dashboard`]);
        }),
      ),
    { dispatch: false },
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authApiActions.loginSuccessNewAccount),
        tap(() => {
          this.modal.warning({
            nzTitle: 'Update your profile now!',
            nzContent: `Please update your profile now so administrator can review and activate it!`,
          });
          this.router.navigate([`/account/profile`]);
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authApiActions.logout),
        tap(() => {
          this.router.navigate([`/auth/login`]);
        }),
      ),
    { dispatch: false },
  );
}
