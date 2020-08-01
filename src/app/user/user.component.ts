import { Component, OnInit } from '@angular/core';

import { UserDataService } from "../user-data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Object;

  constructor(private userData: UserDataService) { }

  ngOnInit(): void {
    this.userData.getUsers().subscribe( data => {
      this.users = data;
    })
  }

}
