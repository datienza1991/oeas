import { Component, Input, OnInit } from '@angular/core';
import { ExamTakerResultList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-exam-result-list',
  templateUrl: './exam-result-list.component.html',
  styleUrls: ['./exam-result-list.component.less']
})
export class ExamResultListComponent implements OnInit {
  @Input() examTakerResultList: ExamTakerResultList[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
