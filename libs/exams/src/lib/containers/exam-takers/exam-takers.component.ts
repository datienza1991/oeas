import { Component, OnInit } from '@angular/core';
import { ExamTakerList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-exam-takers',
  templateUrl: './exam-takers.component.html',
  styleUrls: ['./exam-takers.component.less'],
})
export class ExamTakersComponent implements OnInit {
  examTakerList: ExamTakerList[] = [
    {
      id: 1,
      name: 'John Doe',
      section: '123-A',
      score: '50/60',
      department: 'Grad school',
      hasRecording: false
    },
    {
      id: 1,
      name: 'John Martin',
      section: '123-A',
      score: '25/60',
      department: 'Grad school',
      hasRecording: true
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
