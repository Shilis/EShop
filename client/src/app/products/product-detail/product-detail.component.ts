import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { take } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { AccountService } from 'src/app/shared/account.service';
import { CartService } from 'src/app/shared/cart.service';
import { CategoryApiService } from 'src/app/shared/category-api.service';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  category: Category;
  subCategory: any;

  cart: Cart = {
    id: 0,
    userId: 0,
    itemId: 0,
    quantity: 0
  };

  carts: Cart[];

  user: User;

  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private categoryService: CategoryApiService,
    private cartService: CartService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProduct();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imagePercent: 100,
        thumbnailsColumns: 4,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
        imageInfinityMove: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      {
        breakpoint: 1200,
        width: '400px',
        height: '400px',
        imagePercent: 80,
      }
    ]

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.cartService.getShoppingCartByUserId(user.id).subscribe(carts => this.carts = carts);
    });
  }

  getImages(): NgxGalleryImage[] {
    const imageUrl = [];
    for (const photo of this.product.photos) {
      imageUrl.push({
        small: 'https://localhost:5001/' + photo?.url,
        medium: 'https://localhost:5001/' + photo?.url,
        big: 'https://localhost:5001/' + photo?.url
      })
    }
    return imageUrl;
  }

  loadProduct() {
    this.productService.getproduct(this.route.snapshot.params['id']).subscribe(product => {
      this.product = product
      this.galleryImages = this.getImages();
      this.loadCategory(product.categoryId);
      this.loadSubCategory(product.subCategoryId);
    });
  }

  loadCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe(category => this.category = category);
  }

  loadSubCategory(id: number) {
    this.categoryService.getSubCategoryById(id).subscribe(subCategory => this.subCategory = subCategory);
  }

  addToCart(data: Cart) {
    if(!this.user) {
      this.router.navigate(['/']);
      return;
    }
    if (data.quantity > 0) {
      let isNewItem = true;
      let existingCart: Cart = {
        id: 0,
        userId: 0,
        itemId: 0,
        quantity: 0
      }

      for (let cart of this.carts) {
        if (cart.itemId === this.product.id) {
          isNewItem = false;
          existingCart = cart;
        }
      }

      this.cart.itemId = this.product.id;
      this.cart.userId = this.user.id;

      if (isNewItem) {
        this.cart.quantity = data.quantity;
        this.cartService.addToShoppingCart(this.cart).subscribe();
        return;
      }

      existingCart.quantity += this.cart.quantity;
      this.cartService.updateCart(existingCart.id, existingCart).subscribe();
    }

  }
}
