import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, of } from 'rxjs';
import { User, UserDetail } from '@batstateu/data-models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
import { UserService } from '../../account.module';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'batstateu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;
  userId!: number;
  id!: number;

  @ViewChild(ProfileFormComponent) profileFormComponent!: ProfileFormComponent;
  constructor(
    private store: Store<fromAuth.State>,
    private userService: UserService,
    private modal: NzModalService
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit(): void {
    console.log('profile init..');
    this.getValues();
  }
  onSave(userDetail: UserDetail) {
    userDetail =
      this.id != undefined || this.id > 0
        ? { ...userDetail, id: this.id, user_id: this.userId }
        : { ...userDetail, user_id: this.userId, isActive: false };

    this.userService.save(userDetail).subscribe(() =>
      //TODO:Modal must on container
      this.modal.success({
        nzTitle: 'Success',
        nzContent: 'Record has been saved',
        nzOkText: 'Ok',
      })
    );
  }
  getValues() {
    this.user$.subscribe({
      next: (user) => {
        this.userId = user?.id || 0;
        if (this.userId > 0) {
          this.userService.get(user?.id).subscribe((val) => {
            this.id = val.id;
            const userDetail = {
              ...val,
              code: user?.username || '',
            };
            this.profileFormComponent.setValue(userDetail);
          });
        }
      },
    });
  }
}
