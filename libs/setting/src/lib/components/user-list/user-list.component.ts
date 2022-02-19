import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserDetail, UserList } from '@batstateu/data-models';
@Component({
  selector: 'batstateu-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  @Input() userList!: UserDetail[];
  @Output() deleteRecord = new EventEmitter<UserDetail>();
  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  delete(userdDetail: UserDetail) {
    this.modal.warning({
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete user with name <b>${userdDetail.firstName} ${userdDetail.lastName}</b>?`,
      nzOnOk: () =>{ this.deleteRecord.emit(userdDetail)}
    });
  }
  deleteConfirm() {}
}
