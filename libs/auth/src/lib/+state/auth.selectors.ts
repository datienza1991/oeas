import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
//export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

// export const getAuthLoading = createSelector(
//   getAuthState,
//   (state: AuthState) => state.auth.loading
// );

// export const getAuthError = createSelector(
//   getAuthState,
//   (state: AuthState) => state.auth.error
// );

// export const getUser = createSelector(
//   getAuthState,
//   (state: AuthState) => state.auth.user
// );

