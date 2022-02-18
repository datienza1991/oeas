import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { User } from '@batstateu/data-models';
@Component({
  selector: 'batstateu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("profile init..")
  }

}
