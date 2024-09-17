import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'batstateu-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
})
export class LoginFormComponent {
  public form = input<FormGroup>({} as FormGroup);
  public onSubmit = output<void>();

  passwordVisible = false;

  login() {
    if (this.form().valid) {
      this.onSubmit.emit();
    } else {
      Object.values(this.form().controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
