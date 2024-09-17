import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root'
})
export class ExamGuard  {
  user! : User | null;
  constructor(private store : Store<fromAuth.State>, private router : Router, private message: NzMessageService ){
    this.store.select(fromAuth.getUser).subscribe(val => this.user = val);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.user?.isActive){
      this.router.navigate(['/dashboard']);
      this.message.error("You cannot view exams while your account is inactive!")
      return false;
    }
    return true;
  }
  
}
