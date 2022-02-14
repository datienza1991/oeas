import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { TakeExamRecordingComponent } from '../take-exam-recording/take-exam-recording.component';

@Component({
  selector: 'batstateu-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakeExamComponent implements OnInit {

  @ViewChild(TakeExamRecordingComponent) takeExamRecording? : TakeExamRecordingComponent;
  instruction = 'This is long instruction...';
  isStartExam = false;

  ngOnInit(): void {
    
  }
  
  onStartRecord(){
    this.isStartExam = true;
    this.takeExamRecording?.onStartRecord();
  }
  onBack(){

  }

}
