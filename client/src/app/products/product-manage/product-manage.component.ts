import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { CategoryApiService } from 'src/app/shared/category-api.service';
import { Pagination } from 'src/app/shared/models/pagination';
import { Product } from 'src/app/shared/models/product';
import { ProductParams } from 'src/app/shared/models/productParams';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  products: Product[];
  selectedProduct: Product;

  categoryList: Category[];
  subCategoryList: any[];

  // Map to display data associated with foreign key
  categoriesMap: Map<number, string> = new Map();
  subCategoriesMap: Map<number, string> = new Map();

  pagination: Pagination;
  productParams: ProductParams;


  constructor(private productService: ProductsService,
              private categoryService: CategoryApiService,
              private modalService: NgbModal) 
  {
    this.productParams = new ProductParams();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.refreshCategoriesMap();
    this.refreshSubCategoriesMap();
  }

  loadProducts(){
    this.productService.getProducts(this.productParams).subscribe(products => {
      this.products = products.results;
      this.pagination = products.pagination;
    });
  }

  onCreate(content) {
    this.selectedProduct = null;
    this.modalService.open(content, { size: 'lg' });
  }

  onModalEdit(content, product: Product){
    this.selectedProduct = product;
    this.modalService.open(content, { size: 'lg' });
  }

  onModalDelete(id: number){
    this.productService.deleteProduct(id).subscribe((data) =>{
      this.loadProducts();
    })
  }

  refreshCategoriesMap() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categoryList = data;

      for (let i = 0; i < data.length; i++) {
        this.categoriesMap.set(this.categoryList[i].id, this.categoryList[i].name);
      }
    })
  }

  refreshSubCategoriesMap() {
    this.categoryService.getSubCategoryList().subscribe((data) => {
      this.subCategoryList = data;

      for (let i = 0; i < data.length; i++) {
        this.subCategoriesMap.set(this.subCategoryList[i].id, this.subCategoryList[i].subCategoryName);
      }
    })
  }

  pageChanged(event: any){
    this.productParams.pageNumber = event.page;
    this.loadProducts();
  }
}
