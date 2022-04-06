import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CategoryApiService } from '../../shared/category-api.service';

@Component({
  selector: 'app-show-sub-category',
  templateUrl: './show-sub-category.component.html',
  styleUrls: ['./show-sub-category.component.css']
})
export class ShowSubCategoryComponent implements OnInit {

  categoryList$: Observable<any[]>;
  subCategoryList$: Observable<any[]>;
  categoryList: any = [];

  // Map to display data associated with foreign key
  categoriesMap: Map<number, string> = new Map();

  subCategory: any;

  constructor(private categoryService: CategoryApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subCategoryList$ = this.categoryService.getSubCategoryList();
    this.categoryList$ = this.categoryService.getCategoryList();
    this.refreshCategoriesMap();
  }

  refreshCategoriesMap() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categoryList = data;

      for (let i = 0; i < data.length; i++) {
        this.categoriesMap.set(this.categoryList[i].id, this.categoryList[i].name);
      }
    })
  }

  onCreate(content) {
    const modalRef = this.modalService.open(content);
    this.subCategory = {
      id: 0,
      subCategoryName: null,
      categoryId: null
    }
  }

  onAdded() {
    this.subCategoryList$ = this.categoryService.getSubCategoryList();
  }

  onModalEdit(content, item: any) {
    this.modalService.open(content);
    this.subCategory = item;
  }

  onModalDelete(item: any) {
    this.categoryService.deleteSubCategory(item.id).subscribe(rez => {
      this.onAdded();
    });
  }
}

