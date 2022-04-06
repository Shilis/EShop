import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { CategoryApiService } from 'src/app/shared/category-api.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  categoryList$: Observable<Category[]>;
  selectedCategory: Category;

  constructor(private categoryService: CategoryApiService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getCategoryList();
  }

  onCreate(content) {
    this.selectedCategory = null;
    const modalRef = this.modalService.open(content);
  }

  onAdded(){
    this.categoryList$ = this.categoryService.getCategoryList();
  }

  onModalEdit(content, item: Category){
    this.selectedCategory = item;
    this.modalService.open(content);
  }

  onModalDelete(id: number){
    this.categoryService.deleteCategory(id).subscribe((data) =>{
      this.onAdded();
    })
  }
}
