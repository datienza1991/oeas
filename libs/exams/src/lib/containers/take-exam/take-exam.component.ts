import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { TakeExamRecordingComponent } from '../take-exam-recording/take-exam-recording.component';
import { ExamState, TakeExamControlState } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakeExamComponent implements OnInit {

  @ViewChild(TakeExamRecordingComponent) takeExamRecording? : TakeExamRecordingComponent;
  instruction = 'This is long instruction...';
  TakeExamStateEnum = ExamState;
  TakeExamControlStateEnum = TakeExamControlState;
  takeExamState = ExamState.instructionView;
  takeExamControlState = TakeExamControlState.startRecordView;
  isStartExam = false;
  ngOnInit(): void {
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

  }

}
