import { Component, HostListener, OnInit } from '@angular/core';
import * as fromAuth from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { map, Observable, tap } from 'rxjs';
import { AuthService, getUser } from '@batstateu/auth';
import { Store } from '@ngrx/store';
import { UserService } from '@batstateu/account';

@Component({
  selector: 'batstateu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;
  isCollapsed = false;
  onCollapsed(isCollapsed : boolean){
    this.isCollapsed = isCollapsed
  }
  constructor(
    private store: Store<fromAuth.State>,
    private userService: UserService,
    private authService : AuthService
  ) {
    this.user$ = this.store.select(getUser);
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnInit(): void {
    console.log('layout init');
  }
}
