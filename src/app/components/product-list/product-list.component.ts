import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html', //original template
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  currentCategoryId: number;
  currentCategoryName: string;

  //inject the Service
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    //???
    //ensure listProducts() is invoked whenever the route path changes
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get "id" param string in the current route path and convert it to number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
      //get "name" param to display in the template
      this.currentCategoryName=this.route.snapshot.paramMap.get("name");
    } else {
      //if "id" not available, default category is 1
      this.currentCategoryId=1;
      this.currentCategoryName = 'Books';
    }

    //method is invoked when subscribe
    //get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
