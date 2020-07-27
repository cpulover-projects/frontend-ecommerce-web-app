import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cart: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartItems();
  }

  listCartItems() {
    this.cart = this.cartService.cartItems;
    
    //subscribe to the cart total price
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    )

    //subscribe to the cart total quantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    )

    this.cartService.computeCartTotals();

  }

}
