import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { AccountService } from '../shared/account.service';
import { MembersService } from '../shared/members.service';
import { Order } from '../shared/models/order';
import { OrderDetails } from '../shared/models/orderDetails';
import { Product } from '../shared/models/product';
import { User } from '../shared/models/user';
import { OrdersService } from '../shared/orders.service';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  active = 1;
  user: User;
  orders: Order[];
  orderDetails: OrderDetails[];
  selectedOrder: Order;

  model: any;

  constructor(private accountService: AccountService,
              private orderService: OrdersService,
              private modalService: NgbModal,
              private memberService: MembersService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      if(user.role === 'Admin'){
        this.orderService.getOrders().subscribe(orders => this.orders = orders);
      }else{
        this.orderService.getUserOrders(user.id).subscribe(orders => this.orders = orders);
      }
      this.memberService.getMember(user.id).subscribe(user => this.model = user);
    });
  }

  viewOrder(content, order: Order){
    this.orderService.getOrderDetails(order.id).subscribe(orderDetails => this.orderDetails = orderDetails);
    this.selectedOrder = order;
    this.modalService.open(content, { size: 'lg' });
  }

  updateProfile(){
    console.log(this.model);
  }

  shipOrder(order: Order){
    order.status = "shipped";
    this.orderService.updateOrder(order.id, order).subscribe();
  }

  cancelOrder(order: Order){
    order.status = "cancelled";
    this.orderService.updateOrder(order.id, order).subscribe();
  }
}
