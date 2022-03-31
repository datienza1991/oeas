import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AnswerFormModel } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-exam-item-points-form-view',
  templateUrl: './exam-item-points-form-view.component.html',
  styleUrls: ['./exam-item-points-form-view.component.less'],
})
export class ExamItemPointsFormViewComponent implements OnInit {
  @Input() answerFormModel$!: Observable<AnswerFormModel | null>;
  @Output() save = new EventEmitter<number>();
  limit = 60;
  validateForm!: FormGroup;

  setValue() {
    this.answerFormModel$.subscribe((val) => {
      this.validateForm.patchValue(val || {});
      this.limit = val?.maxPoints || 0;
    });
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value > this.limit) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    if (this.validateForm.valid) {
      this.modal.confirm({
        nzIconType: 'warning',
        nzTitle: 'Submit Points',
        nzContent: `Are you sure you want to submit points? <br/> Submitted points can't be reverted.`,
        nzOnOk: () => {
          this.save.emit(this.validateForm.controls['points'].value);
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
    this.setValue();
  }
}
