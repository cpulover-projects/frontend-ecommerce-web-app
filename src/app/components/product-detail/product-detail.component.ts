import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product(); //Initialize field to avoid race condition
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    //subscribe to extract the router parameters
    this.route.paramMap.subscribe(() => {
      //handleProductDetails is invoked when route parameter changes
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    //get the "id" param as string then convert to number
    const productId: number = +this.route.snapshot.paramMap.get("id");

    //get product from the Service
    this.productService.getProduct(productId).subscribe(
      //then assign the response to product attribute
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
    const theCartItem: CartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }



}
