import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'batstateu-exam-instruction-view',
  templateUrl: './exam-instruction-view.component.html',
  styleUrls: ['./exam-instruction-view.component.less'],
})
export class ExamInstructionViewComponent implements OnInit {
  @Input() instruction?: string;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
