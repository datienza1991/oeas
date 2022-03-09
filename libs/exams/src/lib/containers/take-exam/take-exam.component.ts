import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Inject,
} from '@angular/core';

import { Location } from '@angular/common';
import { TakeExamRecordingComponent } from '../take-exam-recording/take-exam-recording.component';
import {
  Exam,
  ExamAnswer,
  ExamState,
  TakeExamControlState,
  TakerExamQuestion,
} from '@batstateu/data-models';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService, TakeExamService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { APP_CONFIG } from '@batstateu/app-config';
import { BehaviorSubject, Observable } from 'rxjs';

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
  examTitle = '';
  TakeExamStateEnum = ExamState;
  TakeExamControlStateEnum = TakeExamControlState;
  takeExamState = ExamState.instructionView;
  takeExamControlState = TakeExamControlState.startRecordView;
  isStartExam = false;
  enableNextButton = false;
  enablePreviousButton = false;
  examDetailSubject$ = new BehaviorSubject<Exam | null>(null);
  examDetail$ = this.examDetailSubject$.asObservable();

  userDetailId = 23;
  takerExamId!: number;
  examId!: number;
  questions!: TakerExamQuestion[];
  currentQuestion!: TakerExamQuestion;
  currentQuestionSubject$ = new BehaviorSubject<TakerExamQuestion | null>(null);
  currentQuestion$ = this.currentQuestionSubject$.asObservable();
  questionCount = 1;
  questionIdx = 0;
  question = '';
  questionId = 0;

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
            // this.onStartExam();
          });
      },
    });
  }
  getQuestions() {
    this.takeExamService.getAnswers(this.userDetailId).subscribe((val) => {
      const answerArr = val.map((item: any) => item['questionId']);
      this.takeExamService
        .getQuestions(this.examId, answerArr)
        .subscribe((val2) => {
          if(val2.length > 0){
            if (this.questionIdx < 0 || this.questionIdx > val2.length - 1) {
              this.modal.error({
                nzTitle: 'Fetching questions',
                nzContent: `No more questions available`,
                nzOnOk: () => {
                  //
                  this.questionIdx =
                    this.questionIdx > 0
                      ? this.questionIdx >= val2.length - 1
                        ? val2.length - 1
                        : this.questionIdx
                      : 0;
                  this.questionCount = val2.length;
                  this.currentQuestion = val2[this.questionIdx];
                  this.questionId = val2[this.questionIdx].id;
                  this.currentQuestionSubject$.next(this.currentQuestion);
                },
              });
            } else {
              this.currentQuestion = val2[this.questionIdx];
              this.questionId = val2[this.questionIdx].id;
              this.currentQuestionSubject$.next(this.currentQuestion);
            }
          }else{
            this.modal.info({
              nzTitle: 'Completed Exam',
              nzContent: `You completed the exam, click Ok to finish the exam.`,
              nzOnOk: () => {
                this.router.navigate([`exams/${this.examId}/result`])
              },
            });
          }
        });
    });
  }
  onStartExam() {
    this.getQuestions();
    this.takeExamState = ExamState.takeExamQuestionView;
  }
  onSubmitAnswer(answer: string) {
    const examAnswer: ExamAnswer = {
      userDetailId: this.userDetailId,
      questionId: this.questionId,
      examId: this.examId,
      answer: answer,
      points: 0,
    };

    this.takeExamService.addAnswer(examAnswer).subscribe(() => {
      //TODO: If 1 question available, dont
      this.getQuestions();
    });
  }
  onNexQuestion() {
    this.questionIdx++;
    this.getQuestions();
  }
  onPrevQuestion() {
    this.questionIdx--;
    this.getQuestions();
  }
  onBack() {
    this.location.back();
  }
  onFinishExamination() {
    this.router.navigate([`exams/${this.examId}/result`]);
  }
  getExamInstruction() {
    this.examService.get(this.examId).subscribe((val) => {
      this.examDetailSubject$.next(val);
      this.examDetail = val;
      this.examTitle = val.name;
    });
  }
  onUploadRecord(data: any) {
    this.takeExamService.upload(data).subscribe({
      next: (value) =>
        this.takeExamService.get(this.takerExamId).subscribe((val) =>
          this.takeExamService
            .updateTakerExam(this.takerExamId, {
              ...val,
              recUrl: `${this.appConfig.UPLOAD_URL}/uploads/${data.name}`,
            })
            .subscribe()
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
