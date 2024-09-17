import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Authenticate, User } from '@batstateu/data-models';

export const authApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    // defining events with payload using the `props` function
    'Login': props<{ payload: Authenticate }>(),
    'Login Success': props<{ payload: User }>(),
    'Login Success New Account': props<{ payload: User }>(),
    'Login Failure': props<{ error: string }>(),
    // defining an event with payload using the props factory
    'Logout Failure': (error: Error) => ({ error }),
    'Logout': emptyProps(),
  },
});

export const { login, loginSuccess, loginSuccessNewAccount, loginFailure, logout } = authApiActions;
