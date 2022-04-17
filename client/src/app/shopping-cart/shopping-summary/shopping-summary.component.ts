import { Component, OnInit } from '@angular/core';
import { cast } from 'ngx-bootstrap-icons';
import { take } from 'rxjs';
import { AccountService } from 'src/app/shared/account.service';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { Order } from 'src/app/shared/models/order';
import { OrderDetails } from 'src/app/shared/models/orderDetails';
import { User } from 'src/app/shared/models/user';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-shopping-summary',
  templateUrl: './shopping-summary.component.html',
  styleUrls: ['./shopping-summary.component.css']
})
export class ShoppingSummaryComponent implements OnInit {

  user: User;
  carts: Cart[];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
    private accountService: AccountService,
    private orderService: OrdersService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
        this.getCarts(user.id);
      });
     }

  ngOnInit(): void {
  }

  getCarts(userId: number){
    this.cartService.getShoppingCartByUserId(userId).subscribe(data => this.carts = data);
  }

  priceCalculator(event: number){
    this.totalPrice += event;
  }

  placeOrder(){
    const order: Order = {
      id: 0,
      userId: this.user.id,
      status: 'paid'
    }
    this.orderService.addOrder(order).subscribe(response => {
      for(let cart of this.carts){
        var orderDetails: OrderDetails = {
          id: 0,
          orderId: response.id,
          itemId: cart.itemId,
          quantity: cart.quantity
        }
        this.orderService.addOrderDetails(orderDetails);
        this.cartService.removeCart(cart.id).subscribe();
      }

      this.carts = [];
      this.totalPrice = 0;
    });
    
  }
}
