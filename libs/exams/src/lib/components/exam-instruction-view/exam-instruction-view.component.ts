import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'batstateu-exam-instruction-view',
  templateUrl: './exam-instruction-view.component.html',
  styleUrls: ['./exam-instruction-view.component.less'],
})
export class ExamInstructionViewComponent implements OnInit {
  @Input() instruction?: string;
  @Input() isStartExam?: boolean;
  @Output() startRecord = new EventEmitter();
  onBack() {
    this.location.back();
  }
  onStartRecord(){
    this.startRecord.emit();
  }
  constructor(private location: Location) {}

  ngOnInit(): void {}
}
