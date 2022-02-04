import { Component } from '@angular/core';
import { AuthState } from '@batstateu/auth';
import { Store } from '@ngrx/store';
import * as AuthActions from '@batstateu/auth';


@Component({
  selector: 'batstateu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'oeas';

  constructor(private store: Store<AuthState>) {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    if (user.token) {
      this.store.dispatch(AuthActions.loginSuccess(user));
    }
  }
}
