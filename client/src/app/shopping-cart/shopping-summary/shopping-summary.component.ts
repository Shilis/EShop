import { Component, OnInit } from '@angular/core';
import { cast } from 'ngx-bootstrap-icons';
import { take } from 'rxjs';
import { AccountService } from 'src/app/shared/account.service';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user';

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
    private accountService: AccountService) {
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
}
