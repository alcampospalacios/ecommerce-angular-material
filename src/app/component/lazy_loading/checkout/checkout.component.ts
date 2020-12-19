import { Router } from '@angular/router';
import { ProductsService } from './../../../shared/service/products.service';
import { OrdersService } from './../../../shared/service/orders.service';
import { Orders } from './../../../shared/model/orders';
import { User } from './../../../shared/model/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from 'src/app/shared/statate-management/product.state';
import { Observable, Subscription } from 'rxjs';
import { Products } from 'src/app/shared/model/products';
import { AuthenticationNodeService } from 'src/app/shared/service/authentication-node.service';
import { RemoveAllProduct } from 'src/app/shared/statate-management/product.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @Select(ProductsState.getProducts) products$: Observable<Products[]>

  itemFormOne: FormGroup;
  itemFormTwo: FormGroup;

  totalprice: number;
  subscription: Subscription;
  ids: number[];
  order: Orders;
  products: Products[];

  createFormGroupOne() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      ci: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  createFormGroupTwo() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      movilPhone: new FormControl('', [Validators.required]),
      anotherPhone: new FormControl(''),
    });
  }

  constructor(
    private userServ: AuthenticationNodeService,
    private orderService: OrdersService,
    private productService: ProductsService,
    private store: Store,
    private router: Router
  ) {
    this.itemFormOne = this.createFormGroupOne();
    this.itemFormTwo = this.createFormGroupTwo();
    this.ids = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.products$.subscribe(result => {
      this.products = result;
      this.totalprice = 0;
      result.forEach(t => {
        this.totalprice += (t.price * t.orders);
        this.ids.push(t.idProducts);
      });

      let currentTime = new Date();
      let timestamp = currentTime.getTime();

      this.order = {
        idorders: 0,
        idProducts: JSON.stringify(this.ids),
        amount: result.length,
        totalPrice: this.totalprice,
        date: timestamp,
        fk_user: parseInt(localStorage.getItem('id'))
      }
    });

  }

  onSubmit() {
    let user: User = {
      id: parseInt(localStorage.getItem('id')),
      name: this.itemFormOne.get('name').value,
      lastname: this.itemFormOne.get('lastname').value,
      ci: this.itemFormOne.get('ci').value,
      address: this.itemFormOne.get('address').value,
      email: this.itemFormTwo.get('email').value,
      movilPhone: this.itemFormTwo.get('movilPhone').value,
      anotherPhone: this.itemFormTwo.get('anotherPhone').value
    }
    this.userServ.update(user);
    this.orderService.postOrder(this.order);

    this.products.forEach(t => {
      let prod: Products = {
        idProducts: t.idProducts,
        type: t.type,
        category: t.category,
        subCategory: t.subCategory,
        name: t.name,
        description: t.description,
        price: t.price,
        image: t.image,
        subImage1: t.subImage1,
        subImage2: t.subImage2,
        subImage3: t.subImage3,
        rate: t.rate,
        amount: (t.amount-t.orders),
        color: t.color,
        size: t.size,
        mark: t.mark,
        userid: t.userid,
        orders: t.orders
      }
      this.productService.updateProduct(prod);     
    });

    this.removeAllProduct();
    this.router.navigate(['/home']);
  }

  removeAllProduct() {
    this.store.dispatch(new RemoveAllProduct())
  }



}
