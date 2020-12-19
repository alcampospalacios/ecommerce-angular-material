import { ProductsService } from './../../../shared/service/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class DetailProductComponent implements OnInit {
  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.required])
    });
  }

  orderFormControl = new FormControl('', [
    Validators.required,
    Validators.min(10)
  ]);

  ord: number;

  itemForm: FormGroup;
  Icomment: Comment;
  rate: number;

  detailProduct: Products[];
  backgroundColor: string;
  inStorage: number;
  progressBaValue: number;

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

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductsById(id).subscribe(data => {
      this.detailProduct = data;
      this.backgroundColor = `background-color:${this.detailProduct[0].color}`;
      this.inStorage = this.detailProduct[0].amount - this.detailProduct[0].orders;
      this.progressBaValue = (100*this.detailProduct[0].orders)/this.detailProduct[0].amount;
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
        idProducts: product.idProducts,
        type: product.type,
        category: product.category,
        subCategory: product.subCategory,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        subImage1: product.subImage1,
        subImage2: product.subImage2,
        subImage3: product.subImage3,
        rate: product.rate,
        amount: product.amount,
        color: product.color,
        size: product.size,
        mark: product.mark,
        userid: product.userid,
        orders: this.ord
      }
      this.store.dispatch(new AddProduct(prod));
    }
    else {
      solution.forEach(it => {
        if (it.idProducts == product.idProducts) {
          let prod: Products = {
            idProducts: product.idProducts,
            type: product.type,
            category: product.category,
            subCategory: product.subCategory,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            subImage1: product.subImage1,
            subImage2: product.subImage2,
            subImage3: product.subImage3,
            rate: product.rate,
            amount: product.amount,
            color: product.color,
            size: product.size,
            mark: product.mark,
            userid: product.userid,
            orders: ((it.orders || 0) + this.ord)
          }
          flag = true;
          this.updateOrder(prod);
        }
      });

      if (!flag) {
        let prod: Products = {
          idProducts: product.idProducts,
          type: product.type,
          category: product.category,
          subCategory: product.subCategory,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          subImage1: product.subImage1,
          subImage2: product.subImage2,
          subImage3: product.subImage3,
          rate: product.rate,
          amount: product.amount,
          color: product.color,
          size: product.size,
          mark: product.mark,
          userid: product.userid,
          orders: this.ord
        }

        this.store.dispatch(new AddProduct(prod));
      }

  }
}

updateOrder(product: Products) {
  let payload = {
    idProduct: product.idProducts,
    newProduct: product
  }
  this.store.dispatch(new UpdateProduct(payload));
}

}
