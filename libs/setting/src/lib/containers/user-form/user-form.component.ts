import { Component, OnInit } from '@angular/core';
import {
  DepartmentService,
  SectionService,
  UserService,
} from '@batstateu/shared';
import {
  Department,
  Section,
  User,
  UserDetail,
  UserFormType,
  UserType,
} from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'batstateu-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less'],
})
export class UserFormComponent implements OnInit {
  user$!: Observable<User | null>;
  userId!: number;
  id!: number;
  userDetail!: UserDetail;
  isActiveEnable = false;
  departments!: Department[];
  sections!: Section[];
  userTypes!: UserType[];
  code! : string;
  userFormType = UserFormType.FACULTY_ADMIN;
  constructor(
    private store: Store<fromAuth.State>,
    private userService: UserService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private sectionService: SectionService
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit(): void {
    console.log('user form init..');
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
          }
        : {
            ...userDetail,
            user_id: this.userId,
            isActive: false,
            user_type_id: userDetail.userTypeId,
          };

    this.userService.save(newUserDetail).subscribe(() =>
      this.modal.success({
        nzTitle: 'Success',
        nzContent: 'Record has been saved',
        nzOkText: 'Ok',
      })
    );
  }
  getValues() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserDetail(id).subscribe((val) => {
      this.id = val.id;
      this.code = val.code;
      this.userDetail = val;
      this.userFormType =
        val.userType === 'Faculty' || val.userType === 'Admin'
          ? UserFormType.FACULTY_ADMIN
          : UserFormType.STUDENT;
      this.isActiveEnable = true;
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
