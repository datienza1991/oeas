import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamTakerList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-exam-takers-list',
  templateUrl: './exam-takers-list.component.html',
  styleUrls: ['./exam-takers-list.component.less'],
})
export class ExamTakersListComponent implements OnInit {
  @Input() examTakerList: ExamTakerList[] = [];
  constructor() {}

  ngOnInit(): void {}
}
