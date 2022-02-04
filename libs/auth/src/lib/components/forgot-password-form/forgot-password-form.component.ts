import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '@batstateu/data-models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.less']
})
export class ForgotPasswordFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private modal: NzModalService) {}

  @Output() submitForm = new EventEmitter<Authenticate>();
  passwordVisible = false;
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  reset() {
    if (this.validateForm.valid) {
      this.submitForm.emit(this.validateForm.value);
      this.modal.info({
        nzTitle: 'Success Registration',
        nzContent: 'Please try to login your account with in 24hrs with <b>default password 123abc</b> or please email <b>admin@g.batstate-u.edu.ph</b> for more info.',
        nzOkText: "Ok"
      });
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
