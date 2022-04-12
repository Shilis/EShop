import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/category/category.model';
import { CategoryApiService } from 'src/app/shared/category-api.service';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
  @ViewChild('f') createForm : NgForm;
  @Input() selectedProduct : Product;

  product: Product ={
    id: 0,
    title: '',
    description: '',
    price: 0,
    imagePath: '',
    quantity: 0,
    categoryId: 0,
    subCategoryId: 0,
    photos: []
  }
  categories: Category[];
  subCategories: any[] = [];
  categoryId: number = 0;
  subCategoryId: number;

  constructor(private productService: ProductsService,
              private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    if(this.selectedProduct){
      this.loadSubCategories(this.selectedProduct.categoryId);
      this.product = this.selectedProduct;
    }
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getCategoryList().subscribe(categories => this.categories = categories);
  }

  loadSubCategories(id: number){
    this.categoryService.getSubCategoryListOfCategory(id).subscribe(subCategories => this.subCategories = subCategories);
  }

  onSubmit(data: Product){
    if(this.selectedProduct === null){
      this.productService.addProduct(data).subscribe( data => {
        var closeModalBtn = document.getElementById('add-edit-product-close');
        if (closeModalBtn){
          closeModalBtn.click();
        }
      })
    } else{
      this.productService.updateProduct(this.selectedProduct.id, this.product).subscribe();
      var closeModalBtn = document.getElementById('add-edit-product-close');
        if (closeModalBtn){
          closeModalBtn.click();
        }
    }
   
  }
}
