import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemComponent } from './items/item-list/item/item.component';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'lists', component: ListsComponent },
  // { path: 'products', component: ItemsComponent},
  // { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'subCategories', component: SubCategoryComponent, canActivate: [AuthGuard] },
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
