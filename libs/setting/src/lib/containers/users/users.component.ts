import { Component, OnInit } from '@angular/core';
import { UserList } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  userList: UserList[] = [
    {
      id: 1,
      name: 'John Alex',
      department: 'Grad School',
      type: 'Faculty',
      status: 'Inactive',
    },
    {
      id: 2,
      name: 'Smith Blue',
      department: 'Grad School',
      type: 'Student',
      status: 'Inactive'
    },
  ];
  delete(id: number) {
    alert(id);
  }
  constructor() {}

  ngOnInit(): void {}
}
