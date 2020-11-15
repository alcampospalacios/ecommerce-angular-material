import { ProductsService } from './../../../shared/service/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from './../../../shared/model/comment';
import { Products } from 'src/app/shared/model/products';

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

  itemForm: FormGroup;
  Icomment: Comment;
  rate: number;

  detailProduct: Products[];
  defaultImage = '../../../assets/images/default/default-image.png';

  constructor(private route: ActivatedRoute, private location: Location, private productService: ProductsService) {    
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
    });
  }

}
