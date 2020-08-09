import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BurgerDataService {

  urlBurgers: string = 'http://localhost:8888/api/v1/burgers';

  constructor(private http: HttpClient) { }

  getBurgers() {
    return this.http.get(this.urlBurgers);
  }

}
