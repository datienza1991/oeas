import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-exam-form-view',
  templateUrl: './exam-form-view.component.html',
  styleUrls: ['./exam-form-view.component.less']
})
export class ExamFormViewComponent implements OnInit {

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
        nzTitle: 'Success Registration',
        nzContent: 'Your Sr code will be your user name. <br/> Please wait for your account activation.',
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
      name: ['Exam on Science', [Validators.required]],
      subject: ['Science', [Validators.required]],
      startOn: [new Date(), [Validators.required]],
      duration: ['60 mins', [Validators.required]],
      active: [true],
      section: ['1', [Validators.required]],
      instructions: ['Long instruction ...', [Validators.required]]
    });
  }

}
