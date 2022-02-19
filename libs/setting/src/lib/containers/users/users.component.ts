import { Component, OnInit } from '@angular/core';
import { UserDetail, UserList } from '@batstateu/data-models';
import { UserService } from '@batstateu/shared';

@Component({
  selector: 'batstateu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  userList!: UserDetail[];
  onDelete(userDetail : UserDetail) {
    this.userService.deleteUser(userDetail.user_id).subscribe(()=>{
     this.getAll();
    })
  }
  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(){
    this.userService.getAll("").subscribe((val: any)=>{
      this.userList = val;
    })
  }
}
