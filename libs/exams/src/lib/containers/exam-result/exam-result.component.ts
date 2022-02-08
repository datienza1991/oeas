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
      name: 'What is the most',
      points: undefined
    },
    {
      id: 2,
      name: 'Enumerate the importance',
      points: 30
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
