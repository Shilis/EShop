import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    BrowserModule,
    NgbModule
  ],
  exports: [
    NgxBootstrapIconsModule,
    BsDropdownModule,
    NgxGalleryModule,
    BrowserModule,
    NgbModule
  ]
})
export class SharedModule { }
