import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@batstateu/data-models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
@Component({
  selector: 'batstateu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  $user! : Observable<User | null>;
  constructor(private store: Store<fromAuth.State>) {
    this.$user = this.store.select(fromAuth.getUser);
   }

  ngOnInit(): void {
    console.log("profile init..")
  }

}
