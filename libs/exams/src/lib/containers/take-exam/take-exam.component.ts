import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { TakeExamRecordingComponent } from '../take-exam-recording/take-exam-recording.component';
import { Exam, ExamState, TakeExamControlState } from '@batstateu/data-models';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService } from '@batstateu/shared';

@Component({
  selector: 'batstateu-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakeExamComponent implements OnInit {

  @ViewChild(TakeExamRecordingComponent) takeExamRecording? : TakeExamRecordingComponent;
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
  
  onStartRecord(){
    this.takeExamRecording?.onStartRecord();
  }
  onExamReady(){
    this.takeExamControlState = this.TakeExamControlStateEnum.startExamView;
  }
  onStartExam(){
    //TODO: Hide Header Back Button
    // Hide Instruction Input
    // Hide Start Record Button
    // Hide Start Exam Button
    // Show Exam Question View
    this.takeExamState = ExamState.takeExamQuestionView;
    this.takeExamControlState = this.TakeExamControlStateEnum.firstQuestion;
  }
  onNexQuestion(){
    this.takeExamControlState = this.TakeExamControlStateEnum.lastQuestion;
  }
  onPrevQuestion(){
    this.takeExamControlState = this.TakeExamControlStateEnum.firstQuestion;
  }
  onBack(){
    this.location.back();
  }
  onFinishExamination(){
    this.router.navigate([`exams/${this.id}/result`]);
  }
  getExamInstruction(){
    const id = Number(this.route.snapshot.paramMap.get('examId'));
    this.examService.get(id).subscribe((val) => this.examDetail = val)
  }
  constructor(private location : Location, private router : Router, private route : ActivatedRoute, private examService: ExamsService) { }

}
