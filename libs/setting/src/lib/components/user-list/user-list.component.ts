import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserList } from '@batstateu/data-models';
@Component({
  selector: 'batstateu-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  @Input() userList: UserList[] = [];
  @Output() deleteRecord = new EventEmitter<number>();
  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  delete(userListDetail: UserList) {
    this.modal.warning({
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete user with name <b>${userListDetail.name}</b>?`,
      nzOkText: 'Ok',
    });
  }
  deleteConfirm() {}
}
