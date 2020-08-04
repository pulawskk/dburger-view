import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";
import { OrderDataService } from "../order-data.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  userId: number;
  order = {
    userId: '',
    deliveryName: 'delivery name...',
    deliveryStreet: 'delivery street...',
    deliveryCity: 'delivery city...',
    deliveryState: 'delivery state...',
    deliveryZip: 'delivery ZIP...',
    ccNumber: 'credit card number...',
    ccExpiration: 'credit card expiration...',
    ccCVV: 'credit card cvv...'
  };

  orderForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserDataService, private router: ActivatedRoute,
              private orderService: OrderDataService) {
    this.orderForm = this.formBuilder.group({
      deliveryName: ['', Validators.required],
      deliveryStreet: ['', Validators.required],
      deliveryCity: ['', Validators.required],
      deliveryState: ['', Validators.required],
      deliveryZip: ['', Validators.required],
      ccNumber: ['', Validators.required],
      ccExpiration: ['', Validators.required],
      ccCVV: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(data => {
      console.log(data);
      this.userId = data['userId'];
      this.order.userId = this.userId.toString();
    })

    //if user id > 0 and order id == 0 or null

    this.displayEmptyOrderForm();
    //TODO
    // if user id > 0 and order id > 0 -> displayUpdateOrderForm(order id)
  }

  onSubmit() {
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    this.orderService.createOrder(this.orderForm, this.userId);
    this.success = true;

  }

  displayUpdateOrderForm(id: number) {
    this.orderService.getOrderById(id).subscribe(data => {
      this.order.deliveryName = data['deliveryName'];
      this.order.deliveryStreet = data['deliveryStreet'];
      this.order.deliveryCity = data['deliveryCity'];
      this.order.deliveryState = data['deliveryState'];
      this.order.deliveryZip = data['deliveryZip'];
      this.order.ccNumber = data['ccNumber'];
      this.order.ccExpiration = data['ccExpiration'];
      this.order.ccCVV = data['ccCVV'];
    });
  }

  displayEmptyOrderForm() {

  }

  reloadPage() {
    window.location.reload();
  }
}
