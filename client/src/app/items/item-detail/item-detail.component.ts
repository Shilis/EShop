import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { CategoryApiService } from 'src/app/shared/category-api.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  isCollapsed = false;

  categoryList$: Observable<Category[]>;
  subCategoryList$: Observable<any[]>;

  constructor(private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getCategoryList();
    this.subCategoryList$ = this.categoryService.getSubCategoryListOfCategory(1);
  }

  getSubCategories(categoryId: number){
    console.log('method called with number' + categoryId);
    // this.subCategoryList$ = this.categoryService.getSubCategoryListOfCategory(categoryId);
  }

}
