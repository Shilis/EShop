import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ShowSubCategoryComponent } from './sub-category/show-sub-category/show-sub-category.component';
import { AddEditSubCategoryComponent } from './sub-category/add-edit-sub-category/add-edit-sub-category.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from './modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { SearchComponent } from './header/search/search.component';
import { ProductManageComponent } from './products/product-manage/product-manage.component';
import { ProductAddEditComponent } from './products/product-manage/product-add-edit/product-add-edit.component';
import { ShoppingSummaryComponent } from './shopping-cart/shopping-summary/shopping-summary.component';
import { PhotoEditorComponent } from './products/photo-editor/photo-editor.component';
import { SubCategoryFilterComponent } from './products/product-filter/sub-category-filter/sub-category-filter.component';
import { HasRoleDirective } from './shared/directives/has-role.directive';
import { ShoppingItemComponent } from './shopping-cart/shopping-item/shopping-item.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewOrderDetailsComponent } from './profile/view-order-details/view-order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    AddEditCategoryComponent,
    ShowCategoryComponent,
    SubCategoryComponent,
    ShowSubCategoryComponent,
    AddEditSubCategoryComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailComponent,
    ListsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProductCardComponent,
    ProductFilterComponent,
    SearchComponent,
    ProductManageComponent,
    ProductAddEditComponent,
    ShoppingSummaryComponent,
    PhotoEditorComponent,
    SubCategoryFilterComponent,
    HasRoleDirective,
    ShoppingItemComponent,
    ProfileComponent,
    ViewOrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
