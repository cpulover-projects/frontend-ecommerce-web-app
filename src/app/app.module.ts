import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Route, Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

//define routes
const routes: Routes = [
  { path: 'category/:id/:name', component: ProductListComponent },
  //add new route for searching
  { path: 'search/:searchName', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  //add new route for view product detail
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, //** generic wildcard matching anything else */
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailComponent
  ],
  imports: [
    //configure Route
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
