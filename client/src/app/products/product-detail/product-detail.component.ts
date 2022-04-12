import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Product } from 'src/app/shared/models/product';
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

  constructor(private productService: ProductsService,
              private route: ActivatedRoute) { }

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
  }

  getImages(): NgxGalleryImage[]{
    const imageUrl = [];
    for(const photo of this.product.photos){
      imageUrl.push({
        small: 'https://localhost:5001/' + photo?.url,
        medium: 'https://localhost:5001/' + photo?.url,
        big: 'https://localhost:5001/' + photo?.url
      })
    }
    return imageUrl;
  }

  loadProduct(){
    this.productService.getproduct(this.route.snapshot.params['id']).subscribe(product => {
      this.product = product
      this.galleryImages = this.getImages();
  });
  }

}
