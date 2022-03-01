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
  id = 2;

  ngOnInit(): void {
    this.getExamInstruction();
  }

  onStartRecord() {
    const id = Number(this.route.snapshot.paramMap.get('examId'));
    this.modal.confirm({
      nzTitle: 'Start Examination',
      nzContent: `Starting the examination will record your screen. Do you want to continue?`,
      nzOnOk: () => {
        this.takeExamService.addTakerExam({userDetailId: 23, examId: id, recUrl: `${this.appConfig.UPLOADS_URL}/uploads`})
        this.takeExamRecording.onStartRecord();
        this.onStartExam();
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
    this.router.navigate([`exams/${this.id}/result`]);
  }
  getExamInstruction() {
    const id = Number(this.route.snapshot.paramMap.get('examId'));
    this.examService.get(id).subscribe((val) => (this.examDetail = val));
  }
  onUploadRecord(data : any){
    this.takeExamService.upload(data).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
    });
  }
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamsService,
    private modal : NzModalService,
    private takeExamService: TakeExamService,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
