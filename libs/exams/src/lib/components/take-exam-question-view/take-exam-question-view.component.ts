import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TakerExamQuestion } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-take-exam-question-view',
  templateUrl: './take-exam-question-view.component.html',
  styleUrls: ['./take-exam-question-view.component.less'],
})
export class TakeExamQuestionViewComponent implements OnInit, OnChanges {
  @Input() currentQuestion!: TakerExamQuestion;
  @Input() question = "";
  @Input() currentQuestion$!: Observable<TakerExamQuestion | null>;
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
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['question']) {
    //   // this.validateForm.patchValue({ question: this.question });
    // }
    // if (changes['currentQuestion'] && this.currentQuestion) {
    //   this.validateForm.patchValue({ question: this.currentQuestion.question });
    // }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      question: ['What is the ...'],
      answer: ['The answer is ...'],
    });
    this.currentQuestion$.subscribe((val) => {
      if(val){
        this.validateForm.patchValue({ question: val.question });
      }
    });
  }
}
