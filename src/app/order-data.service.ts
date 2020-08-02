import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  url: string = 'http://localhost:8888/api/v1/orders/';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.url);
  }
}
