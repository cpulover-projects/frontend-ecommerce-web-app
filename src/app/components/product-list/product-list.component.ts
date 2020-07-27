import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html', //original template
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  currentCategoryId: number = 1;
  previousCategoryId: number = 1; //for pagination
  currentCategoryName: string = "Books";
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousSearchKeyword: string = null;

  //inject the Service
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    //???
    //ensure listProducts() is invoked whenever the route path changes
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if in the route path there is searchName parameter = searching
    this.searchMode = this.route.snapshot.paramMap.has('searchName');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      //if not searching, list all the products
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('searchName');

    //if the search name is different than the previous one, set page number to 1
    if (this.previousSearchKeyword != keyword) {
      this.thePageNumber = 1;
    }

    //keep track of the keywork
    this.previousSearchKeyword = keyword;
    console.log(`theKeyword=${keyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, keyword)
      .subscribe(
        this.processResult()
      );
  }

  handleListProducts() {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get "id" param string in the current route path and convert it to number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
      //get "name" param to display in the template
      this.currentCategoryName = this.route.snapshot.paramMap.get("name");
    } else {
      //if "id" not available, default category is 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //check if current category is difference from the previous category
    if (this.previousCategoryId != this.currentCategoryId) {
      //if difference, set thePageNumber back to 1
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, previousCategoryId=${this.previousCategoryId}`);

    //method is invoked when subscribe
    //get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      this.processResult());
  }
  processResult() {
    return data => {
      console.log(data);
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    }
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Product name: ${theProduct.name}, product price: ${theProduct.unitPrice}`);
    let cartItem: CartItem= new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  }
}
