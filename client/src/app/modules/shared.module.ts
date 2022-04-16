import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    BrowserModule,
    NgbModule,
    PaginationModule.forRoot()
  ],
  exports: [
    NgxBootstrapIconsModule,
    BsDropdownModule,
    NgxGalleryModule,
    BrowserModule,
    NgbModule,
    PaginationModule
  ]
})
export class SharedModule { }
