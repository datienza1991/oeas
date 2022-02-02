import { createReducer, on, Action } from '@ngrx/store';
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

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
