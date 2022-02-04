import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private authService : AuthService) {

  }
  ngOnInit(): void {}

  logout(){
    this.authService.logout();
  }
}
