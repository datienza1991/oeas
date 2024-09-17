import { Component } from '@angular/core';
import { Authenticate } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';

@Component({
  selector: 'batstateu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  constructor(private store: Store) {}

  login(authenticate: Authenticate): void {
    this.store.dispatch(authActions.authApiActions.login({ payload: authenticate }));
  }
}
