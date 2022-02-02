import { Component, OnInit } from '@angular/core';
import * as fromAuth from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { Observable } from 'rxjs';
import { selectUser } from '@batstateu/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'batstateu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<fromAuth.State>) {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((x) => console.log(x?.token));
  }

  ngOnInit(): void {}
}
