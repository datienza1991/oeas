import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAuth from '../../+state/auth.reducer';

import { Store, select } from '@ngrx/store';
import { selectUser } from '../../+state';
import { User } from '@batstateu/data-models';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<fromAuth.State>) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectUser),
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate([`/auth/login`]);
          return false;
        }
      })
    );
  }
}