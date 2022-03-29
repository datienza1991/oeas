import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
export class TakeExamQuestionViewComponent implements OnInit {
  @Input() currentQuestion!: TakerExamQuestion;
  @Input() question = "";
  @Input() currentQuestion$!: Observable<TakerExamQuestion | null>;
  @Output() save = new EventEmitter();
  @Input() videoVisible$! : Observable<boolean>;
  limit = 60;
  validateForm!: FormGroup;

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
      this.modal.confirm({
        nzTitle: 'Submit Answer',
        nzContent: `Are you sure you want to submit answer? <br/> Submitted answer can't be reverted.`,
        nzOnOk: () => {
          const answer = this.validateForm.controls['answer'].value;
          this.save.emit(answer);
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
  setQuestion(){
    this.currentQuestion$.subscribe((val) => {
      if(val){
        this.question = val.question;
        this.validateForm.patchValue({ answer: ''});
      }
    });
  }
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private location: Location
  ) {}
 

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      answer: [null, [Validators.required]],
    });
    this.setQuestion();
  }
}
