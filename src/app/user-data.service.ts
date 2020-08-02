import { Injectable } from '@angular/core';

import { HttpClient} from "@angular/common/http";
import {Form, FormGroup} from "@angular/forms";
import {UserComponent} from "./user/user.component";
import {UserFormComponent} from "./user-form/user-form.component";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url: string = "http://localhost:8888/api/v1/users/";

  postData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  updateData = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  createUser(messageForm: FormGroup) {
    this.postData.firstName = messageForm.controls.firstName.value;
    this.postData.lastName = messageForm.controls.lastName.value;;
    this.postData.email = messageForm.controls.email.value;;

    this.http.post(this.url, this.postData).toPromise().then(data => {
      console.log(data);
    });
  }

  deleteUser(id: number) {
    this.http.delete(this.url + id).subscribe(data => {
      console.log(data);
    });
  }

  getUser(id: number) {
    return this.http.get(this.url + id);
  }

  updateUser(messageForm: FormGroup, id: number) {
    this.updateData.id = id;
    this.updateData.firstName = messageForm.controls.firstName.value;
    this.updateData.lastName = messageForm.controls.lastName.value;
    this.updateData.email = messageForm.controls.email.value;

    this.http.patch(this.url + id, this.updateData).toPromise().then(data => {
      console.log(data);
    });
  }

  getOrdersForUserId(id: number) {
    return this.http.get(this.url + id + "/orders");
  }
}
