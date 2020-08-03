import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {OrderComponent} from "./order/order.component";
import {OrderFormComponent} from "./order-form/order-form.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserComponent},
  {path: 'orders/:id', component: OrderComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'orderForm', component: OrderFormComponent},
  {path: 'orderForm/:userId', component: OrderFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
