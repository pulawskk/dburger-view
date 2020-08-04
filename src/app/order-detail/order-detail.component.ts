import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderDataService} from "../order-data.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order = {
    id: '',
    userId: '',
    deliveryName: '',
    deliveryStreet: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZip: '',
    ccNumber: '',
    ccExpiration: '',
    ccCVV: ''
  };

  orderId: number;

  constructor(private router: ActivatedRoute, private orderService: OrderDataService) { }

  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.orderId = Number(data['id']);
      this.order.id = this.orderId.toString();
    })
    this.getOrder(this.orderId);
  }

  getOrder(id: number) {
    this.orderService.getOrderById(id).subscribe(data => {
      this.orderService.getOrderById(id).subscribe(data => {
        this.order.userId = data['userId'];
        this.order.deliveryName = data['deliveryName'];
        this.order.deliveryStreet = data['deliveryStreet'];
        this.order.deliveryCity = data['deliveryCity'];
        this.order.deliveryState = data['deliveryState'];
        this.order.deliveryZip = data['deliveryZIP'];
        this.order.ccNumber = data['ccNumber'];
        this.order.ccExpiration = data['ccExpiration'];
        this.order.ccCVV = data['ccCVV'];
      });
    })
  }

}
