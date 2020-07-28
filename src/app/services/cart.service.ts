import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  //use Subject type to publish event to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the item in cart by id 
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id == theCartItem.id) {
      //     existingCartItem == tempCartItem;
      //     break;
      //   }
      // }
      //Refactor
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    } else {
      //just add the item to cart
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

      //debugging
      console.log(`Item: ${currentCartItem.name}, quantity: ${currentCartItem.quantity}`);
    }
    console.log(`>>> Total price: ${totalPriceValue.toFixed(2)}, total quantity: ${totalQuantityValue}`);

    //pulish new values to the subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      //update new values to other subscriber components
      this.computeCartTotals();
    } else {
      this.removeItem(item);
    }

  }

  removeItem(item: CartItem) {
    const itemIdex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIdex > -1) {
      this.cartItems.splice(itemIdex, 1);
      this.computeCartTotals();
    }
  }
}
