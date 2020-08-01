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
  }

}
