import { Location } from '@angular/common';
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
import { ActivatedRoute } from '@angular/router';
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
  instruction = `<div style="color:#808080"><h3><strong>Subject</strong>:</h3>
  <h1><strong><u>Important</u></strong></h1>
  <p>
     Your Upcoming Exam The upcoming [Midterm/Final/Ect.] exam is facilitated using an online examination administration system.
  </p>
  <p>In order to take the exam, there are some important steps you will need to take.
  </p>
  <p>Failure to do so in a timely manner may result in your not having access to the exam.
  </p>
  <ul>
     <li>
        <p>Choose the entire screen when you share the screen.
        </p>
     </li>
     <li>
        <p>The application will request to access your camera and audio.
        </p>
     </li>
     <li>
        <p>The examination has a time limit set by the faculty.
        </p>
     </li>
     <li>
        <p>Leaving your exam tab for 15 seconds will end your examination automatically.</p>
     </li>
  </ul></div>`;

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
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
  onBack() {
    this.location.back();
  }
  setValue() {
    this.validateForm.patchValue({
      ...this.examDetail,
      startOn: new Date(this.examDetail.startOn),
    });
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

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private location: Location
  ) {}
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
      instructions: [this.instruction, [Validators.required]],
    });
  }
}
