import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductManageComponent } from './products/product-manage/product-manage.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ShoppingSummaryComponent } from './shopping-cart/shopping-summary/shopping-summary.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'product/manage', component: ProductManageComponent, pathMatch: 'full', canActivate: [AdminGuard]},
  { path: 'categories', component: CategoryComponent, canActivate: [AdminGuard] },
  { path: 'subCategories', component: SubCategoryComponent, canActivate: [AdminGuard] },
  { path: 'carts', component: ShoppingSummaryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'errors', component: TestErrorsComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
