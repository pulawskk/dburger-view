import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";
import { OrderDataService } from "../order-data.service";
import { BurgerDataService } from "../burger-data.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  userId: number;
  orderId: number = 0;

  burgers: Object;

  update: boolean = false;

  order = {
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
              private orderService: OrderDataService, private burgerService: BurgerDataService) {
    this.orderForm = this.formBuilder.group({
      burgerChoice: [''],
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
      this.userId = Number(data['userId']);
      if(data['orderId'] != null) {
        this.orderId = Number(data['orderId']);
      }
    })

    if (this.userId > 0 && this.orderId == 0) {
      this.displayEmptyOrderForm();
    } else if (this.userId > 0 && this.orderId > 0) {
      this.update = true;
      this.displayUpdateOrderForm(this.orderId);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    if(this.update) {
      this.orderService.updateOrder(this.orderForm, this.userId);
      this.update = false;
    } else {
      console.dir(this.orderForm);
      this.orderService.createOrder(this.orderForm, this.userId);
    }
    this.success = true;

  }

  displayUpdateOrderForm(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(data => {
      this.orderForm = this.formBuilder.group({
        deliveryName: [data['deliveryName'], Validators.required],
        deliveryStreet: [data['deliveryStreet'], Validators.required],
        deliveryCity: [data['deliveryCity'], Validators.required],
        deliveryState: [data['deliveryState'], Validators.required],
        deliveryZip: [data['deliveryZip'], Validators.required],
        ccNumber: [data['ccNumber'], Validators.required],
        ccExpiration: [data['ccExpiration'], Validators.required],
        ccCVV: [data['ccCVV'], Validators.required]
      });

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
    this.burgerService.getBurgers().subscribe(data => {
      this.burgers = data;
      console.log(this.burgers);
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
