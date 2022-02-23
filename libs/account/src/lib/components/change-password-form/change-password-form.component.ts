import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.less']
})
export class ChangePasswordFormComponent implements OnInit {

  @Output() save = new EventEmitter<ChangePassword>();
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  
  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value
      this.save.emit({newPass: formData.newpassword, oldPass: formData.oldpassword})
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['newpassword'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, private modal: NzModalService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      newpassword: [null, [Validators.required]],
      oldpassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

}
