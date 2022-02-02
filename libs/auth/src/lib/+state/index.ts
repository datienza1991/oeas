import { User } from '@batstateu/data-models';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './auth.reducer';
export const state = createFeatureSelector<State>('auth');
export const selectUser = createSelector(state, (authState: State): User | null => authState.user);