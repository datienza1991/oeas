import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Inject,
} from '@angular/core';

import { Location } from '@angular/common';
import { TakeExamRecordingComponent } from '../take-exam-recording/take-exam-recording.component';
import { Exam, ExamState, TakeExamControlState } from '@batstateu/data-models';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService, TakeExamService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { APP_CONFIG } from '@batstateu/app-config';

@Component({
  selector: 'batstateu-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakeExamComponent implements OnInit {
  @ViewChild(TakeExamRecordingComponent)
  takeExamRecording!: TakeExamRecordingComponent;
  examDetail!: Exam;
  TakeExamStateEnum = ExamState;
  TakeExamControlStateEnum = TakeExamControlState;
  takeExamState = ExamState.instructionView;
  takeExamControlState = TakeExamControlState.startRecordView;
  isStartExam = false;

  userDetailId = 23;
  takerExamId!: number;
  examId!: number;

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.getExamInstruction();
  }

  onStartRecord() {
    this.modal.confirm({
      nzTitle: 'Start Examination',
      nzContent: `Starting the examination will record your screen. Do you want to continue?`,
      nzOnOk: () => {
        this.takeExamService
          .addTakerExam({ userDetailId: 23, examId: this.examId, recUrl: '' })
          .subscribe((val) => {
            this.takerExamId = val;
            this.takeExamRecording.onStartRecord();
          });
      },
    });
  }

  onStartExam() {
    this.takeExamState = ExamState.takeExamQuestionView;
    this.takeExamControlState = this.TakeExamControlStateEnum.firstQuestion;
  }
  onNexQuestion() {
    this.takeExamControlState = this.TakeExamControlStateEnum.lastQuestion;
  }
  onPrevQuestion() {
    this.takeExamControlState = this.TakeExamControlStateEnum.firstQuestion;
  }
  onBack() {
    this.location.back();
  }
  onFinishExamination() {
    this.router.navigate([`exams/${this.examId}/result`]);
  }
  getExamInstruction() {
    this.examService
      .get(this.examId)
      .subscribe((val) => (this.examDetail = val));
  }
  onUploadRecord(data: any) {
    this.takeExamService.upload(data).subscribe({
      next: (value) =>
        this.takeExamService
          .get(this.takerExamId)
          .subscribe((val) =>
            this.takeExamService.updateTakerExam(this.takerExamId, {
              ...val,
              recUrl: `${this.appConfig.UPLOAD_URL}/uploads/${data.name}`,
            }).subscribe()
          ),
      error: (err) => console.log(err),
    });
  }
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamsService,
    private modal: NzModalService,
    private takeExamService: TakeExamService,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
