import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'batstateu-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {
  @Input() isCollapsed!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
