import { Component, Input, OnInit } from '@angular/core';
import { Department } from '@batstateu/data-models';

@Component({
  selector: 'shared-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.less']
})
export class DepartmentListComponent implements OnInit {
  @Input() departments : Department[] =[];
  @Input() departmentId! : string;
  constructor() { }

  ngOnInit(): void {
  }

}
