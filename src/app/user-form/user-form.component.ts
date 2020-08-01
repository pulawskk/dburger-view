import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../user-data.service";

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

  constructor(private formBuilder: FormBuilder, private userService: UserDataService) {
    this.messageForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.userDataService = userService;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.userService.createUser(this.messageForm);
    this.success = true;
  }

}
