import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '@batstateu/data-models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'batstateu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  onRegister(value: any) {
    const reg = { username: value.username, password: value.password };
    this.authService.register(reg).subscribe({
      error: (e) => console.log(e.error),
    });
    this.modal.success({
      nzTitle: 'Success Registration',
      nzContent:
        'Your Sr code will be your user name. <br/> Please wait for your account activation.',
      nzOkText: 'Ok',
    });
  }
  constructor(
    private modal: NzModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
