import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Authenticate } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../+state/auth.reducer';
import * as authActions from './../../+state/auth.actions';

@Component({
  selector: 'batstateu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    console.log('Login Init..');
  }

  login(authenticate: Authenticate): void {
    this.store.dispatch(authActions.login({ payload: authenticate }));
  }
}
