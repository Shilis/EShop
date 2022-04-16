import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { CategoryApiService } from 'src/app/shared/category-api.service';

@Component({
  selector: 'app-sub-category-filter',
  templateUrl: './sub-category-filter.component.html',
  styleUrls: ['./sub-category-filter.component.css']
})
export class SubCategoryFilterComponent implements OnInit {

  @Input() category: Category;
  subCategories: any[];

  constructor(private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.categoryService.getSubCategoryListOfCategory(this.category.id).subscribe(data => this.subCategories = data);
  }

  applySubCategoriesFilter(subCategoryId: Number){
    console.log(subCategoryId);
  }
}
