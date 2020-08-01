import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../user-data.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  userDataService: UserDataService;

  matDialog: MatDialog;

  constructor(private formBuilder: FormBuilder, private userService: UserDataService, private dialog: MatDialog) {
    this.messageForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.userDataService = userService;

    this.matDialog = dialog;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    if (this.messageForm.valid) {
      this.userService.createUser(this.messageForm);
      this.success = true;
      this.matDialog.closeAll();
    }
  }

}
