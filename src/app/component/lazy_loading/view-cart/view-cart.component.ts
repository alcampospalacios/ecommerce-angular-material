import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Products } from 'src/app/shared/model/products';
import { RemoveProduct, UpdateProduct } from 'src/app/shared/statate-management/product.actions';
import { ProductsState } from 'src/app/shared/statate-management/product.state';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  @Select(ProductsState.getProducts) products$: Observable<Products[]>

  constructor(private store: Store) { }

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

}
