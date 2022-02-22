import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Department, Section, UserDetail, UserFormType, UserType } from '@batstateu/data-models';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.css'],
})
export class UserFormViewComponent implements OnInit, OnChanges {
  @Output() save = new EventEmitter<UserDetail>();
  @Input() userDetail!: UserDetail;
  @Input() isActiveEnable = false;
  validateForm!: FormGroup;
  @Input() departments!: Department[];
  @Input() sections!: Section[];
  @Input() userFormType!: UserFormType
  @Input() userTypes!: UserType[];
  UserFormTypeEnum = UserFormType;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  setValue() {
    this.validateForm.patchValue(this.userDetail);
    if (this.isActiveEnable) {
      this.validateForm.controls['isActive'].enable();
    }
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const userDetail: UserDetail = { ...this.validateForm.value };
      this.save.emit(userDetail);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private modal: NzModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userDetail']) {
      if (this.userDetail != undefined) {
        this.setValue();
        this.setSectionValidator();
      }
    }
  }
  setSectionValidator() {
    if(this.userFormType === UserFormType.FACULTY_ADMIN){
      this.validateForm.controls['sectionId'].clearValidators();
      this.validateForm.controls['sectionId'].updateValueAndValidity();
      
    }
  }

  ngOnInit(): void {
   
    this.validateForm = this.fb.group({
      code: [{ value: null, disabled: true }, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contactNumberPrefix: ['+63'],
      contactNumber: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      sectionId: [null, [Validators.required]],
      isActive: [{ value: false, disabled: true }],
      userTypeId: [null,[Validators.required]]
    });
  }
}
