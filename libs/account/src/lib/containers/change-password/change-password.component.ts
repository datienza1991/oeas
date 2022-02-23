import { Component, OnInit } from '@angular/core';
import { ChangePassword, User } from '@batstateu/data-models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'batstateu-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less'],
})
export class ChangePasswordComponent implements OnInit {
  user$!: Observable<User | null>;
  user!: User | null;
  constructor(
    private modal: NzModalService,
    private userService: UserService,
    private store: Store<fromAuth.State>
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit(): void {
    this.getUser();
  }

  onSave(changePassword: ChangePassword) {
    this.userService
      .changePassword(
        this.user?.username || '',
        changePassword.oldPass,
        changePassword.newPass
      )
      .subscribe(() =>
        // this.userService.changePassword();
        this.modal.success({
          nzTitle: 'Success Password Changed',
          nzContent: 'Your password has been changed.',
          nzOkText: 'Ok',
        })
      );
  }

  getUser() {
    this.user$.subscribe((val) => (this.user = val));
  }
}
