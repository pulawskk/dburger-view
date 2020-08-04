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
    userId: '',
    deliveryName: 'delivery name...',
    deliveryStreet: 'delivery street...',
    deliveryCity: '',
    deliveryState: '',
    deliveryZip: '',
    ccNumber: '',
    ccExpiration: '',
    ccCVV: ''
  };

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.urlOrders);
  }

  getOrderById(id: number) {
    return this.http.get(this.urlOrders + "/" + id);
  }

  createOrder(form: FormGroup, userId: number) {
    this.order.deliveryName = form.controls.deliveryName.value;
    this.order.deliveryStreet = form.controls.deliveryStreet.value;
    this.order.deliveryCity = form.controls.deliveryCity.value;
    this.order.deliveryState = form.controls.deliveryState.value;
    this.order.deliveryZip = form.controls.deliveryZip.value;
    this.order.ccNumber = form.controls.ccNumber.value;
    this.order.ccExpiration = form.controls.ccExpiration.value;
    this.order.ccCVV = form.controls.ccCvv.value;

    this.http.post(this.urlUsers + "/"+userId+"/orders", this.order).toPromise().then(data => {
      console.log(data);
    });
  }

  updateOrder(form: FormGroup, id: number) {
    this.order.id = id.toString();
    this.order.deliveryName = form.controls.deliveryName.value;
    this.order.deliveryStreet = form.controls.deliveryStreet.value;
    this.order.deliveryCity = form.controls.deliveryCity.value;
    this.order.deliveryState = form.controls.deliveryState.value;
    this.order.deliveryZip = form.controls.deliveryZip.value;
    this.order.ccNumber = form.controls.ccNumber.value;
    this.order.ccExpiration = form.controls.ccExpiration.value;
    this.order.ccCVV = form.controls.ccCVV.value;

    this.http.patch(this.urlOrders + "/" + id, this.order).toPromise().then(data => {
      console.log(data);
    });
  }

  deleteOrder(id: number) {
    console.log(this.urlOrders + "/" + id);
    this.http.delete(this.urlOrders + "/" + id).toPromise();
  }
}
