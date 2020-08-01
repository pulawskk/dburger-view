import { Injectable } from '@angular/core';

import { HttpClient} from "@angular/common/http";
import { FormGroup } from "@angular/forms";

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
}
