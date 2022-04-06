import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryApiService } from 'src/app/shared/category-api.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit{
  @ViewChild('f') createForm : NgForm;

  @Input() selectedCategory : Category;
  categoryName: string = '';

  constructor(private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    if(this.selectedCategory !== null){
      this.categoryName = this.selectedCategory.name;
    }
  }

  onSubmit(data: Category){
    if(this.selectedCategory === null){
      this.categoryService.addCategory(data).subscribe((data) =>{
        var closeModalBtn = document.getElementById('add-edit-category-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
    } else{
      this.selectedCategory.name = data.name;
      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe();
    }
   
  }

}
