import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  urlOrders: string = 'http://localhost:8888/api/v1/orders';
  urlUsers: string = 'http://localhost:8888/api/v1/users';

  order = {
    id: '',
    deliveryName: 'delivery name...',
    deliveryStreet: 'delivery street...'
    // deliveryCity: '',
    // deliveryState: '',
    // deliveryZip: '',
    // ccNumber: '',
    // ccExpiration: '',
    // ccCVV: ''
  };

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.urlOrders);
  }

  getOrderById(id: number) {
    return this.http.get(this.urlOrders + "/" + id);
  }

  createOrder(form: FormGroup) {
    this.order.deliveryName = form.controls.deliveryName.value;
    this.order.deliveryStreet = form.controls.deliveryStreet.value;
    console.log(this.order);
    this.http.post(this.urlUsers + "/1/orders", this.order).toPromise().then(data => {
      console.log(data);
    });
  }

  updateOrder(form: FormGroup, id: number) {
    this.http.patch(this.urlUsers + "/" + id, this.order);
  }
}
