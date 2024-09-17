import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import {
  Department,
  Section,
  User,
  UserDetail,
  UserFormLocation,
  UserFormType,
  UserType,
} from '@batstateu/data-models';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';

import { NzModalService } from 'ng-zorro-antd/modal';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DepartmentService, SectionService, UserService } from '@batstateu/shared';
@Component({
  selector: 'batstateu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  private readonly store: Store = inject(Store);
  user$!: Observable<User | null>;
  userId!: number;
  id!: number;
  userDetail!: UserDetail;
  code!: string;
  isActiveEnable = false;
  departments!: Department[];
  sections!: Section[];
  userTypes!: UserType[];
  userFormType = UserFormType.FACULTY_ADMIN;
  userFormLocation = UserFormLocation.PROFILE;
  isHideUserTypeList = false;
  private readonly user = this.store.selectSignal(fromAuth.getUser);
  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit(): void {
    this.getValues();
    this.getDepartments();
    this.getSections();
    this.getUserTypes();
  }
  onSave(userDetail: UserDetail) {
    const newUserDetail =
      this.id != undefined || this.id > 0
        ? {
            ...userDetail,
            id: this.id,
            user_id: this.userId,
            user_type_id: userDetail.userTypeId,
            isResetPassword: false,
          }
        : {
            ...userDetail,
            user_id: this.userId,
            isActive: false,
            user_type_id: userDetail.userTypeId,
            isResetPassword: false,
          };

    this.userService.save(newUserDetail).subscribe(() => {
      this.modal.success({
        nzTitle: 'Success',
        nzContent: 'Record has been saved',
        nzOkText: 'Ok',
      });
      this.isHideUserTypeList = true;
    });
  }
  getValues() {
    this.userId = this.user()?.id || 0;
    this.code = this.user()?.username || '';

    this.userService
      .get(this.user()?.id)
      .pipe(filter(() => this.userId > 0))
      .subscribe((val) => {
        this.id = val.id;
        this.userDetail = val;
        this.isHideUserTypeList = true;
      });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe((val) => {
      this.departments = val;
    });
  }
  getSections() {
    this.sectionService.getAll().subscribe((val) => {
      this.sections = val;
    });
  }
  getUserTypes() {
    this.userService.getAllUserTypes().subscribe((val) => {
      this.userTypes = val;
    });
  }
}
