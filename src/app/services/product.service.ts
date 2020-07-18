import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product } from '../common/product';
import { ProductCategory } from 'src/app/common/product-category';
import {map} from 'rxjs/operators';

@Injectable({ // this means the service can be injected into other classes/components
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";

  //inject HttpClient to make HTTP requests
  constructor(private httpClient: HttpClient) { }

  //map the JSON data from REST API to Product array
  getProductList(categoryId:number): Observable<Product[]>{
    //define endpoint for searching (match to the REST API)
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`; 

    //HttpClient makes GET method to receive GetResonse from the defined URL (API)
    return this.httpClient.get<GetResponseProduct>(searchUrl)
    //then transform (map) 
    .pipe(map(response=>response._embedded.products));
  } 
  
  getProductCategoryList(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl)
    .pipe(map(response=>response._embedded.productCategory));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
   return this.httpClient.get<GetResponseProduct>(searchUrl)
   .pipe(map(response=>response._embedded.products));
  }

}

//???
// unwrap the json from Spring Data REST _embedded entry
interface GetResponseProduct {
  _embedded:{
    products: Product[];
  }
}

interface GetResponseCategory {
  _embedded:{
    productCategory: ProductCategory[];
  }
}