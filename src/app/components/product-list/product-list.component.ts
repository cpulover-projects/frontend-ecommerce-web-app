import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html', //original template
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  //inject the Service
  constructor(private productService: ProductService) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    //method is invoked when subscribe
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
