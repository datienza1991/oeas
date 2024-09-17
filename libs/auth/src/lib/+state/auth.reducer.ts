import { createReducer, on, createFeature } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@batstateu/data-models';
export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  loading: boolean;
  user: User | null;
  error: '';
}

export const initialState: State = {
  error: '',
  user: null,
  loading: false,
};
//feature selector on index.ts
const authReducer = createFeature({
  name: 'Auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.authApiActions.login, (state, action) => ({
      ...state,
      auth: action.payload,
      loading: true,
    })),
    on(AuthActions.authApiActions.loginSuccess, (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,
    })),
    on(AuthActions.authApiActions.loginSuccessNewAccount, (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,
    })),
    on(AuthActions.authApiActions.loginFailure, (state) => ({
      ...state,
      user: null,
      loading: false,
    })),
    on(AuthActions.authApiActions.logout, (state) => ({
      ...state,
      user: null,
      loading: false,
    })),
  ),
});

export const { name, reducer, selectAuthState, selectUser, selectLoading, selectError } =
  authReducer;
