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
    deliveryStreet: 'delivery street...'
    // deliveryCity: '',
    // deliveryState: '',
    // deliveryZip: '',
    // ccNumber: '',
    // ccExpiration: '',
    // ccCVV: ''
  };

  orderForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserDataService, private router: ActivatedRoute,
              private orderService: OrderDataService) {
    this.orderForm = this.formBuilder.group({
      deliveryName: ['', Validators.required],
      deliveryStreet: ['', Validators.required]
      // deliveryCity: ['', Validators.required],
      // deliveryState: ['', Validators.required],
      // deliveryZip: ['', Validators.required],
      // ccNumber: ['', Validators.required],
      // ccExpiration: ['', Validators.required],
      // ccCVV: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.userId = data['id'];
      this.order.userId = this.userId.toString();
      console.log(this.userId);
    })

    // if(this.id > 0) {
    // // update order with data from data base
    //   this.displayUpdateOrderForm(this.id);
    // } else {
    //   this.id = 0;
    //   this.displayEmptyOrderForm();
    // }

    this.displayEmptyOrderForm();
  }

  onSubmit() {
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    this.orderService.createOrder(this.orderForm);
    this.success = true;

  }

  displayUpdateOrderForm(id: number) {
    this.orderService.getOrderById(id).subscribe(data => {
      this.order.deliveryName = data['deliveryName'];
      this.order.deliveryStreet = data['deliveryStreet'];
    });
  }

  displayEmptyOrderForm() {

  }
}
