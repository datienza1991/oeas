import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'batstateu-take-exam-control',
  templateUrl: './take-exam-control.component.html',
  styleUrls: ['./take-exam-control.component.less']
})
export class TakeExamControlComponent implements OnInit {
  @Input() isStartExam = false;
  @Output() startRecord = new EventEmitter();

  onStartRecord() {
    this.startRecord.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
