import { Subscription } from 'rxjs';
import { ProductsService } from './../../../shared/service/products.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from './../../../shared/model/comment';
import { Products } from 'src/app/shared/model/products';
import { Store } from '@ngxs/store';
import { AddProduct, UpdateProduct } from 'src/app/shared/statate-management/product.actions';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit, OnDestroy {
  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.required])
    });
  }

  detailProduct: Products;
  Icomment: Comment;
  itemForm: FormGroup;
  orderFormControl: FormControl;
  subscription: Subscription;

  ord: number;
  rate: number;
  inStorage: number;
  progressBaValue: number;

  backgroundColor: string;
  defaultImage = '../../../assets/images/default/default-image.png';

  constructor(private route: ActivatedRoute,
    private location: Location,
    private productService: ProductsService,
    private store: Store) {
    this.itemForm = this.createFormGroup();
  }

  onSubmit() {

    this.Icomment = {
      id: 0,
      name: this.itemForm.get('name').value,
      email: this.itemForm.get('email').value,
      comment: this.itemForm.get('comment').value,
      rate: this.rate
    }

    console.log(this.Icomment);

    // this.auth.signin(this.user).then(() => {
    //   this.showSuccess();      
    // },
    //   () => {
    //     this.showError();        
    //   });
  }

  get name() { return this.itemForm.get('name'); }
  get email() { return this.itemForm.get('email'); }
  get comment() { return this.itemForm.get('comment'); }

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getProductsById(id).subscribe(data => {
      this.detailProduct = data;      
      this.backgroundColor = `background-color:${this.detailProduct.color}`;
      this.inStorage = this.detailProduct.amount;
      this.progressBaValue = (100 * this.detailProduct.orders) / this.detailProduct.amount;

      this.orderFormControl = new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(this.inStorage)
      ]);
    });
  }

  addProductSM(product: Products) {
    let solution: Products[];
    this.store.select(state => state.products.products).subscribe(data => {
      solution = data
    });

    let flag = false;
    if (solution.length === 0) {
      let prod: Products = {
        id: product.id,
        type: product.type,
        category: product.category,        
        name: product.name,
        description: product.description,
        price: product.price,        
        subImage1: product.subImage1,
        subImage2: product.subImage2,
        subImage3: product.subImage3,
        rate: product.rate,
        amount: product.amount,
        color: product.color,
        size: product.size,
        mark: product.mark,        
        orders: this.ord
      }
      this.store.dispatch(new AddProduct(prod));
    }
    else {
      solution.forEach(it => {
        if (it.id == product.id) {
          let prod: Products = {
            id: product.id,
            type: product.type,
            category: product.category,            
            name: product.name,
            description: product.description,
            price: product.price,            
            subImage1: product.subImage1,
            subImage2: product.subImage2,
            subImage3: product.subImage3,
            rate: product.rate,
            amount: product.amount,
            color: product.color,
            size: product.size,
            mark: product.mark,            
            orders: ((it.orders || 0) + this.ord)
          }
          flag = true;
          this.updateOrder(prod);
        }
      });

      if (!flag) {
        let prod: Products = {
          id: product.id,
          type: product.type,
          category: product.category,          
          name: product.name,
          description: product.description,
          price: product.price,          
          subImage1: product.subImage1,
          subImage2: product.subImage2,
          subImage3: product.subImage3,
          rate: product.rate,
          amount: product.amount,
          color: product.color,
          size: product.size,
          mark: product.mark,          
          orders: this.ord
        }

        this.store.dispatch(new AddProduct(prod));
      }

    }
  }

  updateOrder(product: Products) {
    let payload = {
      id: product.id,
      newProduct: product
    }
    this.store.dispatch(new UpdateProduct(payload));
  }

}
