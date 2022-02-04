import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '@batstateu/ng-zorro-antd';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'profile'},
      { path: 'profile', component: ProfileComponent },
    ]),
  ],
  declarations: [
    ProfileFormComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent
  ],
})
export class AccountModule {}
