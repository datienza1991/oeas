import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'batstateu-take-exam-result-view',
  templateUrl: './take-exam-result-view.component.html',
  styleUrls: ['./take-exam-result-view.component.less'],
})
export class TakeExamResultViewComponent implements OnInit {
  @Input() percentage!: number | null;
  @Input() examTitle!: string;
  @Input() scoreSummary!: string;
  constructor() {

    
  }

  ngOnInit(): void {}
}
