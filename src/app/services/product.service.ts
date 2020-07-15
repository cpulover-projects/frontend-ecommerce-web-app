import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product } from '../common/product';
import {map} from 'rxjs/operators';


@Injectable({ // this means the service can be injected into other classes/components
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";

  //inject HttpClient to make HTTP requests
  constructor(private httpClient: HttpClient) { }

  //map the JSON data from REST API to Product array
  getProductList(): Observable<Product[]>{
    //HttpClient makes GET method to receive GetResonse from the defined URL (API)
    return this.httpClient.get<GetResponse>(this.baseUrl).
    //then transform (map) 
    pipe(map(response=>response._embedded.products));
  }  
}

// unwrap the json from Spring Data REST _embedded entry
interface GetResponse {
  _embedded:{
    products: Product[];
  }
}