import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { authApiActions } from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() user$!: Observable<User | null>;
  @Output() collapsed = new EventEmitter<boolean>();
  isCollapsed = false;

  private readonly store = inject(Store);

  onCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsed.emit(this.isCollapsed);
  }
  logout() {
    this.store.dispatch(authApiActions.logout());
  }
}
