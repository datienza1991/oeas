import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Exam, ExamList } from '@batstateu/data-models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.less'],
})
export class ExamListComponent {
  @Input() examList!: Exam[];
  @Output() deleteRecord = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  searchText = '';
  constructor(private modal: NzModalService) {}



  delete(examListDetail: Exam) {
    this.modal.warning({
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete exam with name <b>${examListDetail.name}</b>?`,
      nzOkText: 'Ok',
    });
  }
  deleteConfirm() {}
  onSearchChange(criteria: string) {
    this.search.emit(criteria);
  }
}
