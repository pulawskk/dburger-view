import { Component, OnInit } from '@angular/core';

import { UserDataService } from "../user-data.service";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Object;
  user: Object;

  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private userData: UserDataService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userData.getUsers().subscribe( data => {
      this.users = data;
    })
  }

  openUserFormModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "create-user-btn";
    dialogConfig.height = "350px";
    dialogConfig.width = "650px";

    const modalDialog = this.matDialog.open(UserFormComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(() => this.loadUsers());
  }

  deleteUser(id: number) {
    this.userData.deleteUser(id);
    this.loadUsers();
  }

  updateUser(id: number) {
    this.userData.getUser(id).subscribe(data => {
      this.user = data;
    });
  }

  openUserFormModalUpdate(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "create-user-btn";
    dialogConfig.height = "350px";
    dialogConfig.width = "650px";

    this.userData.getUser(id).subscribe(data => {
      for (let key in data) {
        this.firstName = data['firstName'];
        this.lastName = data['lastName'];
        this.email = data['email'];
      }
    });

    const modalDialog = this.matDialog.open(UserFormComponent, dialogConfig);
    const instance = modalDialog.componentInstance;

    instance.userUpdateData.id = id;
    instance.userUpdateData.firstName = this.firstName;
    instance.userUpdateData.lastName = this.lastName;
    instance.userUpdateData.email = this.email;

    modalDialog.afterClosed().subscribe(() => this.loadUsers());
  }

}
