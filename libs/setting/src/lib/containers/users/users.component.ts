import { Component, OnInit } from '@angular/core';
import { UserDetail } from '@batstateu/data-models';
import { UserService } from '@batstateu/shared';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';

@Component({
  selector: 'batstateu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  userList!: UserDetail[];
  private searchSubject$ = new BehaviorSubject<string>('');
  test!: Observable<string>;
  onDelete(userDetail: UserDetail) {
    this.userService.deleteUser(userDetail.user_id).subscribe(() => {
      this.getAll('');
    });
  }
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll('');

    this.searchSubject$
      .asObservable()
      .pipe(
        map((val) => val.trim()),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((val) => this.getAll(val));
  }

  getAll(criteria: string) {
    this.userService.getAll(criteria).subscribe((val: UserDetail[]) => {
      this.userList = val;
    });
  }
  onSearch(val: string) {
    this.searchSubject$.next(val);
  }
}
