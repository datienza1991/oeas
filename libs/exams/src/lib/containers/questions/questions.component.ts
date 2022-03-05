import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionList } from '@batstateu/data-models';
import { QuestionService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'batstateu-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less']
})
export class QuestionsComponent implements OnInit {
  private searchSubject$ = new BehaviorSubject<string>('');
  questionList!: QuestionList[];
  criteria = '';
  examId!: number;
  delete(id : number){
    alert(id);
  }
  constructor(private questionService : QuestionService, private modal : NzModalService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.getAll('');
    this.searchSubject$
      .asObservable()
      .pipe(
        map((val) => val.trim()),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((val) => {
        this.getAll(val);
      });
  }
  getAll(criteria: string) {
    this.questionService.getAll(this.examId,criteria).subscribe((val) => {
      this.questionList = val
    });
  }
  onSearch(criteria : string){
    this.criteria = criteria;
    this.searchSubject$.next(criteria);
  }

  onDelete(id: number) {
    this.questionService.delete(id).subscribe(() => {
      this.modal.success({
        nzTitle: 'Delete Success',
        nzContent: `Record has been deleted`,
      });
      this.getAll(this.criteria);
    });
  }
}
