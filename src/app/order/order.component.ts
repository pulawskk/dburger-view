import { Component, OnInit } from '@angular/core';
import {OrderDataService} from "../order-data.service";
import { UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Object;
  id: number;

  constructor(private orderData: OrderDataService,
              private userData: UserDataService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.id = data['id'];
      console.log(this.id);
    })

    if(this.id > 0) {
      this.loadOrdersForUserId(this.id);
    } else if(this.id == null) {
      this.loadOrders();
    }
  }

  loadOrders() {
    this.orderData.getOrders().subscribe(data => {
      this.orders = data;
    })
  }

  loadOrdersForUserId(id: number) {
    this.userData.getOrdersForUserId(id).subscribe(data => {
      this.orders = null;
      this.orders = data;
    });
  }
}
