import { Component, OnInit } from '@angular/core';
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
  delete(id : number){
    alert(id);
  }
  constructor(private questionService : QuestionService, private modal : NzModalService) { }

  ngOnInit(): void {
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
    this.questionService.getAll(criteria).subscribe((val) => {
      this.questionList = val
      // this.cd.detectChanges();
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
