import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/shared/models/pagination';
import { Product } from 'src/app/shared/models/product';
import { ProductParams } from 'src/app/shared/models/productParams';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pagination: Pagination;

  productParams: ProductParams;
  
  constructor(private productService: ProductsService) {
    this.productParams = new ProductParams();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts(this.productParams).subscribe(
      products => {
        this.products = products.results;
        this.pagination = products.pagination;
      });
  }

  pageChanged(event: any){
    this.productParams.pageNumber = event.page;
    this.loadProducts();
  }

  categoryChangedHandler(event: any){
    this.productParams.categoryId = event;
    this.loadProducts();
  }
  
  resetFilters(){
    this.productParams = new ProductParams();
    this.loadProducts();
  }
}
