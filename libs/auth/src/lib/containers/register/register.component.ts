import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'batstateu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
