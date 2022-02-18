import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '@batstateu/data-models';
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
  @Input() user$!: Observable<User | null>;

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  setValue() {
    this.user$.subscribe({
      next: (val) => {
        this.userService.get(val?.id).subscribe({next : (val2) =>{
          if(val2 !== undefined){
            console.log(val2)
            this.validateForm.patchValue({
              code: val?.username,
              email: val2.email,
              firstname: val2.firstName,
              middlename: val2.middleName,
              lastname: val2.lastName,
              address: val2.address,
              department: val2.departmentId,
              section: val2.sectionId,
              contactNumber: val2.contactNumber
              //TODO: set more field values
            });
          }
        }})
      },
    });
  }
  genderChange(value: string): void {
    // this.validateForm.get('note')?.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.modal.success({
        nzTitle: 'Success',
        nzContent: 'Record has been saved',
        nzOkText: 'Ok',
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

  constructor(private fb: FormBuilder, private modal: NzModalService, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [{ value: '12-3456', disabled: true }, [Validators.required]],
      email: [
        null,
        [Validators.email, Validators.required],
      ],
      firstname: [null, [Validators.required]],
      middlename: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contactNumberPrefix: ['+63'],
      contactNumber: ['920123456', [Validators.required]],
      department: [null, [Validators.required]],
      section: [null, [Validators.required]],
    });
    this.setValue();
  }
}
