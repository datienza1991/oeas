import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamState, TakeExamControlState } from '@batstateu/data-models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-take-exam-control',
  templateUrl: './take-exam-control.component.html',
  styleUrls: ['./take-exam-control.component.less']
})
export class TakeExamControlComponent implements OnInit {
  @Input() isStartExam = false;
  @Input() enableNextButton = false;
  @Input() enablePreviousButton = false;
  @Output() startRecord = new EventEmitter();
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();
  @Output() finishExam = new EventEmitter();
  @Input() takeExamControlState = TakeExamControlState.startRecordView;
  @Input() takeExamState = ExamState.instructionView;
  TakeExamControlStateEnum = TakeExamControlState;
  TakeExamStateEnum = ExamState;
  onStartRecord() {
    this.startRecord.emit();
  }
  onNexQuestion(){
    this.nextQuestion.emit();
  }
  onPrevQuestion(){
    this.prevQuestion.emit();
  }
  onFinishExam(){
    this.modal.confirm({
      nzTitle: 'Finish Examination',
      nzContent: 'Are you sure you want to finish this examination?',
      nzOnOk: () => this.finishExam.emit()
    });
  }
  constructor( private modal: NzModalService) { }

  ngOnInit(): void {
  }

}
