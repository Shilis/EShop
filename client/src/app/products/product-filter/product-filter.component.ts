import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { CategoryApiService } from 'src/app/shared/category-api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[];
  subCategories: any[];

  @Output() categoryChanged: EventEmitter<number> = new EventEmitter()

  constructor(private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getCategoryList().subscribe(
      categories => this.categories = categories);
  }

  applyCategoriesFilter(categoryId: number){
    this.categoryChanged.emit(categoryId);
  }
}
