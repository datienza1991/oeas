import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Location } from '@angular/common';
import { QuestionDetail } from '@batstateu/data-models';
@Component({
  selector: 'batstateu-question-form-view',
  templateUrl: './question-form-view.component.html',
  styleUrls: ['./question-form-view.component.less']
})
export class QuestionFormViewComponent implements OnInit, OnChanges {
  @Output() save = new EventEmitter<QuestionDetail>();
  @Input() questionDetail! : QuestionDetail;
  validateForm!: FormGroup;
  title = "Add New";
  
  submitForm(): void {
    if (this.validateForm.valid) {
      this.save.emit(this.validateForm.value);
      
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  setValue() {
    this.validateForm.patchValue(this.questionDetail);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionDetail']) {
      if (this.questionDetail) {
        this.setValue();
        this.title = "Edit"
      }
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
      question: [null,[Validators.required]],
      correctAnswer: [null,[Validators.required]],
      maxpoints: [60, [Validators.required]],
    });
  }

}
