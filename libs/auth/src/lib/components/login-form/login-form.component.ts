import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Authenticate } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
})
export class LoginFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() submitForm = new EventEmitter<Authenticate>();
  passwordVisible = false;
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  login() {
    if (this.validateForm.valid) {
      this.submitForm.emit(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
