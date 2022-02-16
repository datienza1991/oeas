import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionList } from '@batstateu/data-models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.less']
})
export class QuestionListComponent implements OnInit {

  @Input() questionList: QuestionList[] = [];
  @Output() deleteRecord = new EventEmitter<number>();
  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  delete(questionListDetail: QuestionList) {
    this.modal.warning({
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete question with name <b>${questionListDetail.name}</b>?`,
      nzOkText: 'Ok',
    });
  }
  deleteConfirm() {}

}
