import { Component, OnInit } from '@angular/core';
import { ExamTakerResultList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.less'],
})
export class ExamResultComponent implements OnInit {
  examTakerResultList: ExamTakerResultList[] = [
    {
      id: 1,
      name: 'Prelim exam on English',
      points: 20
    },
    {
      id: 2,
      name: 'Geometric Exams',
      points: 30
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
