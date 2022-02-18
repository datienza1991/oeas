import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, of } from 'rxjs';
import { User, UserDetail } from '@batstateu/data-models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
import { UserService } from '../../account.module';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
@Component({
  selector: 'batstateu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;
  userDetail!: UserDetail;
  @ViewChild(ProfileFormComponent) profileFormComponent! : ProfileFormComponent;
  constructor(
    private store: Store<fromAuth.State>,
    private userService: UserService
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit(): void {
    console.log('profile init..');
    this.getValues();
  }
  onSave(userDetail : UserDetail){
    this.userService.save({...userDetail, isActive: false, userid: 0}).subscribe();
  }
  getValues() {
    this.user$.subscribe({
      next: (user) => {
        this.userService.get(user?.id).subscribe((val) => {
          this.userDetail = {
            ...val,
            username: user?.username || '',
          };
          this.profileFormComponent.setValue(this.userDetail);
        });
      },
    });
  }
}
