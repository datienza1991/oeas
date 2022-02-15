import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamState, TakeExamControlState } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-take-exam-control',
  templateUrl: './take-exam-control.component.html',
  styleUrls: ['./take-exam-control.component.less']
})
export class TakeExamControlComponent implements OnInit {
  @Input() isStartExam = false;
  @Output() startRecord = new EventEmitter();
  @Output() startExam = new EventEmitter();
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();
  @Input() takeExamControlState = TakeExamControlState.startRecordView;
  @Input() takeExamState = ExamState.instructionView;
  TakeExamControlStateEnum = TakeExamControlState;
  TakeExamStateEnum = ExamState;
  onStartRecord() {
    this.startRecord.emit();
  }

  onStartExam(){
    this.startExam.emit();
  }
  onNexQuestion(){
    this.nextQuestion.emit();
  }
  onPrevQuestion(){
    this.prevQuestion.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
