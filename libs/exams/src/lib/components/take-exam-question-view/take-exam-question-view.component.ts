import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-take-exam-question-view',
  templateUrl: './take-exam-question-view.component.html',
  styleUrls: ['./take-exam-question-view.component.less']
})
export class TakeExamQuestionViewComponent implements OnInit {

  limit = 60;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
      //TODO: set limit for points
    } else if (control.value > this.limit) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.modal.confirm({
        nzIconType: 'warning',
        nzTitle: 'Submit Points',
        nzContent: `Are you sure you want to submit points? <br/> Submitted points can't be reverted.`,
        nzOnOk: () => {
          this.location.back();
        },
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
  cancel() {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      question: ['What is the ...'],
      answer: ['The answer is ...'],
      correctAnswer: ['The correct answer is ...'],
      points: [null, [Validators.required, this.confirmationValidator]],
    });
  }

}
