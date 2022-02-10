import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'batstateu-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styleUrls: ['./exam-instruction.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamInstructionComponent implements OnInit {
  instruction = 'This is long instruction';
  isStartExam = false;
  startRecord(){
    this.isStartExam = true;
  }
  constructor() {}

  ngOnInit(): void {}
}
