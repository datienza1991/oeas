import { Component, OnInit } from '@angular/core';
import { QuestionList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less']
})
export class QuestionsComponent implements OnInit {
  questionList: QuestionList[] = [
    {
      id: 1,
      name: 'What is the ....',
      maxPoints: 60
    },
    {
      id: 2,
      name: 'Enumerations ...',
      maxPoints: 60
    },
  ];
  delete(id : number){
    alert(id);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
