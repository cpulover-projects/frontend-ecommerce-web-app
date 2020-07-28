import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice:number=0.00;
  totalQuantity:number=0;

  constructor(private formBuilder: FormBuilder,private cartService:CartService) { }


  getOrderDetails() {
    //subscribe to cart service total price
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe to cart service total quantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }
  ngOnInit(): void {
    this.getOrderDetails();
    
    console.log("Total price"+this.totalPrice);


    this.checkoutFormGroup = this.formBuilder.group({
      //group 1. key: customer
      customer: this.formBuilder.group({
        firstName: [''], //initial value empty
        lastName: [''],
        email: ['']
      }),
      //group 2. key: shippingAddress
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      //group 3. key: billingAddress
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        type: [''],
        name: [''],
        number: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });
  }

  onSubmit() {
    console.log("Handling form submission...");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Email: " + this.checkoutFormGroup.get('customer').value.email);

    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log("Billing address: " + this.checkoutFormGroup.get('billingAddress').value);

  }

  copyShippingToBillingAddress(event) {
    if (event.target.checked) {
      console.log("Check box!");
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      //clear form group
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

}
