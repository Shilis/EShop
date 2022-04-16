import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
  @Input() productId: number;
  @Input() cart: Cart;

  @Output() price = new EventEmitter<number>();

  product: Product;


  constructor(private productService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getproduct(this.productId).subscribe(product => {
      this.product = product;
      let productTotalPrice = product.price * this.cart.quantity;
      this.price.emit(productTotalPrice);
    });
  }

  increaseProduct() {
    this.cart.quantity += 1;
    this.cartService.updateCart(this.cart.id, this.cart).subscribe();
    this.price.emit(this.product.price);
  }

  decreaseProduct() {
    if (this.cart.quantity < 2) {
      this.removeProduct();
      return;
    }

    this.cart.quantity -= 1;
    this.price.emit(-this.product.price);
    this.cartService.updateCart(this.cart.id, this.cart).subscribe();
  }

  removeProduct() {
    this.cartService.removeCart(this.cart.id).subscribe(() => this.loadProduct());
  }
}
