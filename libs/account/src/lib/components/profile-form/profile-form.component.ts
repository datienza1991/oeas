import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.less']
})
export class ProfileFormComponent implements OnInit {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  
  genderChange(value: string): void {
    // this.validateForm.get('note')?.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.modal.success({
        nzTitle: 'Success',
        nzContent: 'Record has been saved',
        nzOkText: "Ok"
      });
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
    } else if (control.value !== this.validateForm.controls['password'].value) {
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
      code: ['12-3456', [Validators.required]],
      email: ['user@g.batstate-u.edu.ph', [Validators.email, Validators.required]],
      firstname: ['John', [Validators.required]],
      middlename: ['Luke', [Validators.required]],
      lastname: ['Doe', [Validators.required]],
      address: ['Batangas', [Validators.required]],
      contactNumberPrefix: ['+63'],
      contactNumber: ['920123456', [Validators.required]],
      department: ['1', [Validators.required]],
      section: ['1', [Validators.required]]
    });
  }

}
