import { Component, HostListener, OnInit } from '@angular/core';
import * as fromAuth from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { map, Observable, tap } from 'rxjs';
import { getUser } from '@batstateu/auth';
import { Store } from '@ngrx/store';
import { UserService } from '@batstateu/account';

@Component({
  selector: 'batstateu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;
 
  constructor(
    private store: Store<fromAuth.State>,
    private userService: UserService
  ) {
    this.user$ = this.store.select(getUser);
  }

  ngOnInit(): void {
    console.log('layout init');
  }
}
