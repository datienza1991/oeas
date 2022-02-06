import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExamList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsComponent implements OnInit {
  examList: ExamList[] = [
    {
      id: 1,
      name: 'Prelim exam on English',
      subject: 'English',
      startOn: '16/02/2022 12:00pm',
      duration: '60 mins',
      passers: '10/20',
      department: 'Grad school',
      status: 'Inactive',
    },
    {
      id: 2,
      name: 'Geometric Exams',
      subject: 'Math',
      startOn: '16/05/2022 12:00pm',
      duration: '90 mins',
      passers: '10/20',
      department: 'Grad school',
      status: 'Active',
    },
  ];
  delete(id : number){
    alert(id);
  }
  constructor() {}

  ngOnInit(): void {}
}
