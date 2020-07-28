import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  expirationMonths: number[] = [];
  expirationYears: number[] = [];

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private formService: FormService) { }


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

    //populate credit card months and years
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getMonths(startMonth).subscribe(
      data => {
        console.log(data);
        this.expirationMonths = data
      }
    )
    this.formService.getYears().subscribe(
      data => {
        console.log(data);
        this.expirationYears = data
      }
    )

    //populate countries and states
    this.formService.getCountries().subscribe(
      data => {
        console.log(data);
        this.countries = data
      }
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code; //???

    //populate states by the country code using service 
    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data
        } else {
          this.billingAddressStates = data
        }

        //select first value as default
        formGroup.get('state').setValue(data[0]);
      }
    )
  }

  handleMonthsOnYears() {
    let startMonth: number;
    const currentYear = new Date().getFullYear();
    //let selectedYear = Number(this.checkoutFormGroup.controls.creditCard.value.expirationYear);
    const selectedYear = Number(this.checkoutFormGroup.get('creditCard').value.expirationYear);


    //if select current year, count from the current month
    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    //populate the month list based on the starting month
    this.formService.getMonths(startMonth).subscribe(
      data => {
        // set the value of starting month for the field form
        this.checkoutFormGroup.controls.creditCard.patchValue({ expirationMonth: startMonth });
        this.expirationMonths = data
      }
    )
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
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

        //bug fix for state copy
        this.billingAddressStates=this.shippingAddressStates;
    } else {
      //clear form group
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates=[];
    }
  }

}
