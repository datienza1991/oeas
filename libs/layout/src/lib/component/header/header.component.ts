import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@batstateu/auth';
import { User } from '@batstateu/data-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() user$!: Observable<User | null>;
  @Output() collapsed = new EventEmitter<boolean>();
  isCollapsed = false;
  constructor(private authService : AuthService) {

  }
  ngOnInit(): void {}

  onCollapsed(){
    this.isCollapsed = !this.isCollapsed
    this.collapsed.emit(this.isCollapsed);
  }
  logout(){
    this.authService.logout();
  }
}
