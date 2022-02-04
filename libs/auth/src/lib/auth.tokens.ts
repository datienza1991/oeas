import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './+state/auth.reducer';
import * as fromActions from './+state/auth.actions';

export const AUTH_STORAGE_KEYS = new InjectionToken<keyof fromReducer.State[]>('AuthStorageKeys');
export const AUTH_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('AuthStorage');
export const AUTH_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.State, fromActions.AuthActions>>('AuthConfigToken');