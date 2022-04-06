import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryApiService } from '../../shared/category-api.service';

@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html',
  styleUrls: ['./add-edit-sub-category.component.css']
})
export class AddEditSubCategoryComponent implements OnInit {

  subCategoryList$: Observable<any[]>;
  categoriesList$: Observable<any[]>;

  @Input() subCategory: any;
  id: number = 0;
  subCategoryName: string = "";
  categoryId: number;

  constructor(private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.id = this.subCategory.id;
    this.subCategoryName = this.subCategory.subCategoryName;
    this.categoryId = this.subCategory.categoryId;
    this.categoriesList$ = this.categoryService.getCategoryList();
    this.subCategoryList$ = this.categoryService.getSubCategoryList();
  }

  addSubCategory() {
    var subCategory = {
      subCategoryName: this.subCategoryName,
      categoryId: this.categoryId
    }
    this.categoryService.addSubCategory(subCategory).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    })
  }

  updateSubCategory() {
    var subCategory = {
      id: this.id,
      subCategoryName: this.subCategoryName,
      categoryId: this.categoryId
    }
    var id: number = this.id;
    this.categoryService.updateSubCategory(id, subCategory).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    })
  }

}
