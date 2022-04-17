import { Component, Input, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/shared/models/orderDetails';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {

  @Input() orderDetail: OrderDetails;
  product: Product;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.productService.getproduct(this.orderDetail.itemId).subscribe(product => this.product = product);
  }
}
