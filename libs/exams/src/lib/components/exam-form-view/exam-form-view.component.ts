import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
import { Exam, Section } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Editor, toHTML, Toolbar } from 'ngx-editor';

@Component({
  selector: 'batstateu-exam-form-view',
  templateUrl: './exam-form-view.component.html',
  styleUrls: ['./exam-form-view.component.less'],
})
export class ExamFormViewComponent implements OnInit, OnChanges, OnDestroy {
  editor!: Editor;
  html!: '';
  @Output() save = new EventEmitter<Exam>();
  @Input() sections!: Section[];
  @Input() examDetail!: Exam;
  validateForm!: FormGroup;
  title = 'Add New';

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic' ],
    ['underline', 'strike'],
    ['blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


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
    this.validateForm.patchValue({...this.examDetail, startOn: new Date(this.examDetail.startOn)});
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  durationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private modal: NzModalService) {}
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['examDetail']) {
      if (this.examDetail) {
        this.setValue();
        this.title = 'Edit';
      }
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      startOn: [new Date(), [Validators.required]],
      duration: [60, [Validators.required, this.durationValidator]],
      sectionId: [null, [Validators.required]],
      instructions: [null, [Validators.required]],
    });
  }
}
