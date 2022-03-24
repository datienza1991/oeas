import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@batstateu/data-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css'],
})
export class LayoutViewComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @Input() user$!: Observable<User | null>;
  @Output() logout = new EventEmitter();
  constructor() {
    this.isCollapsed = false;
  }
  onLogout(){
    this.logout.emit();
  }

  ngOnInit(): void {}
}
