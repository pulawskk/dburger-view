import { Component, OnInit } from '@angular/core';
import {OrderDataService} from "../order-data.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Object;

  constructor(private orderData: OrderDataService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderData.getOrders().subscribe(data => {
      this.orders = data;
    })
  }

}
