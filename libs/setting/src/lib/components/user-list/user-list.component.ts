import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserDetail, UserList } from '@batstateu/data-models';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  switchMap,
} from 'rxjs';
@Component({
  selector: 'batstateu-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent {
  @Input() userList!: UserDetail[];
  @Output() deleteRecord = new EventEmitter<UserDetail>();
  @Output() search = new EventEmitter<string>();
  @Output() resetPassword = new EventEmitter();
  searchText = '';

  constructor(private modal: NzModalService) {}

  delete(userdDetail: UserDetail) {
    this.modal.confirm({
      nzIconType: 'question-circle',
      nzTitle: 'Delete Record',
      nzContent: `Are you sure you want to delete user with name <b>${userdDetail.firstName} ${userdDetail.lastName}</b>?`,
      nzOnOk: () => {
        this.deleteRecord.emit(userdDetail);
      },
    });
  }
  onResetPassword(userdDetail: UserDetail) {
    this.modal.confirm({
      nzTitle: 'Reset Password',
      nzContent: `Are you sure you want to reset password of user with name <b>${userdDetail.firstName} ${userdDetail.lastName}</b>?`,
      nzOnOk: () => {
        this.resetPassword.emit({
          userId: userdDetail.user_id,
          userDetailId: userdDetail.id,
        });
      },
    });
  }

  onSearchChange(val: any) {
    this.search.emit(val);
  }
}
