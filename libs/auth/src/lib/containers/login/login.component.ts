import { Component, inject } from '@angular/core';
import { Authenticate } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'batstateu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  public readonly form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  login(): void {
    const payload = { ...this.form.getRawValue() };
    this.store.dispatch(authActions.authApiActions.login({ payload: payload as Authenticate }));
  }
}
