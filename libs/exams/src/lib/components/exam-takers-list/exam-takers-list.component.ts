import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamTakerList } from '@batstateu/data-models';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ExamTakerList> | null;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'batstateu-exam-takers-list',
  templateUrl: './exam-takers-list.component.html',
  styleUrls: ['./exam-takers-list.component.less'],
})
export class ExamTakersListComponent implements OnInit {
  @Input() examTakerList: ExamTakerList[] = [];
  @Output() viewScore = new EventEmitter();
  @Output() search = new EventEmitter<string>();
  searchText = '';

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: ExamTakerList, b: ExamTakerList) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null]
    }
  ];

  onViewScore(userDetailId: number, examId: number){
    const takerExamIdObj = {userDetailId: userDetailId, examId: examId}
    this.viewScore.emit(takerExamIdObj);
  }
  onSearchChange(criteria: string) {
    this.search.emit(criteria);
  }
  constructor() {}

  ngOnInit(): void {}
}
