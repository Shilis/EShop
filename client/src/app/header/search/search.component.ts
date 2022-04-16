import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  products: Product[];

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProductsDefault().subscribe(products => this.products = products);
  }

  formatter = (result: Product) => {
    result.title;
    this.navigateToProduct(result.id)}

  resultFormatList(value: Product) {            
    return value.title;
  } 

  search: OperatorFunction<string, readonly Product[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.products.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    
  navigateToProduct(productId: number){
    this.router.navigateByUrl(`/products/${productId}`);
  }
}
