import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';
import { User } from '@batstateu/data-models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthData {
  loading: boolean;
  user: User | null;
  error: '';
}

export interface AuthState {
  readonly auth: AuthData;
}

const obj  = JSON.stringify({id: 3, username: "admin", country: "usa", role: "admin", token: "admin-token"})

export const initialState: AuthData = {
  error: '',
  user: JSON.parse(obj),
  loading: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => ({ ...state, auth: action.payload, loading: true })),
  on(AuthActions.loginSuccess, (state,action) => ({
    ...state,
    user: action.payload,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state) => ({
    ...state,
    user: null,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    loading: false,
  })),
);

export function reducer(state: AuthData | undefined, action: Action) {
  return authReducer(state, action);
}
