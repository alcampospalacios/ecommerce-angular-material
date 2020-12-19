import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Products } from 'src/app/shared/model/products';
import { RemoveProduct, UpdateProduct } from 'src/app/shared/statate-management/product.actions';
import { ProductsState } from 'src/app/shared/statate-management/product.state';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  @Select(ProductsState.getProducts) products$: Observable<Products[]>
  subscription: Subscription;
  totalprice: number;

  constructor(private store: Store, private location: Location) {
    this.subscription = this.products$.subscribe(result => {
      this.totalprice = 0;
      result.forEach(t => {
        this.totalprice += (t.price * t.orders);
      });
    });
   }

  ngOnInit(): void {
  }

  increment(product: Products) {

    product.orders = product.orders + 1;

    let payload = {
      idProduct: product.idProducts,
      newProduct: product
    }
    this.store.dispatch(new UpdateProduct(payload));
  }

  decrement(product: Products) {
    product.orders = product.orders - 1;

    let payload = {
      idProduct: product.idProducts,
      newProduct: product
    }
    this.store.dispatch(new UpdateProduct(payload));
  }

  removeProduct(idProducts: number) {
    this.store.dispatch(new RemoveProduct(idProducts))
  }

  goBack() {
    this.location.back();
  }

}
