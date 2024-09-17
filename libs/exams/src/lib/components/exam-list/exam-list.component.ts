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
  @Input() isStudent!: boolean;
  @Output() deleteRecord = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter();
  searchText = '';
  constructor(private modal: NzModalService) {}

  delete(examListDetail: Exam) {
    this.modal.confirm({
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete exam with name <b>${examListDetail.name}</b>?`,
      nzOnOk: () => {
        this.deleteRecord.emit(examListDetail.id);
      },
    });
  }
  onSearchChange(criteria: string) {
    this.search.emit(criteria);
  }
  onChangeStatus(id? : number, status?: boolean){
    this.changeStatus.emit({id,status});
  }
}
