import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Authenticate } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor() {}
  @Output() submitForm = new EventEmitter<Authenticate>();

  ngOnInit(): void {}

  login(authenticate: Authenticate) {
    this.submitForm.emit(authenticate);
  }
}
