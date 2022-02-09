import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from '@batstateu/ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './containers/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormViewComponent } from './components/user-form-view/user-form-view.component';
import { UserFormComponent } from './containers/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,

    RouterModule.forChild([
      { path: '', pathMatch : 'full', redirectTo: "users" },
      { path: 'users', component: UsersComponent},
      { path: 'users/:id/edit', component: UserFormComponent},
      { path: 'users/add', component: UserFormComponent},
    ]),
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserFormViewComponent,
    UserFormComponent
  ],
})
export class SettingModule {}
