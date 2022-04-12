import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getCategoryList().subscribe(
      categories => this.categories = categories);
  }

  loadSubCategories(categoryId: number){
    this.categoryService.getSubCategoryListOfCategory(categoryId).subscribe(subCategories => this.subCategories = subCategories);
    console.log(categoryId);
  }
}
