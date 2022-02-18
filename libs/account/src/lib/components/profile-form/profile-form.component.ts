import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User, UserDetail } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { UserService } from '../../account.module';

@Component({
  selector: 'batstateu-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.less'],
})
export class ProfileFormComponent implements OnInit {
  @Output() save = new EventEmitter<UserDetail>();
  id! : number;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  genderChange(value: string): void {
    // this.validateForm.get('note')?.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  setValue(userDetail : UserDetail) {
    this.id = userDetail.id;
      this.validateForm.patchValue({
        code: userDetail.username,
        email: userDetail.email,
        firstName: userDetail.firstName,
        middleName: userDetail.middleName,
        lastName: userDetail.lastName,
        address: userDetail.address,
        departmentId: userDetail.departmentId,
        sectionId: userDetail.sectionId,
        contactNumber: userDetail.contactNumber.substring(3),
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const userDetail : UserDetail = {...this.validateForm.value }
      this.save.emit(userDetail);
      
      //TODO:Modal must on container
      // this.modal.success({
      //   nzTitle: 'Success',
      //   nzContent: 'Record has been saved',
      //   nzOkText: 'Ok',
      // });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
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
      code: [{ value: '12-3456', disabled: true }, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contactNumberPrefix: ['+63'],
      contactNumber: ['920123456', [Validators.required]],
      departmentId: [null, [Validators.required]],
      sectionId: [null, [Validators.required]],
    });
  }
}
