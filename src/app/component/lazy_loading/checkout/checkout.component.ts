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
import { RemoveAllProduct } from 'src/app/shared/statate-management/product.actions';
import { jsPDF } from "jspdf";
import { right } from '@popperjs/core';

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
      ci: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  createFormGroupTwo() {
    return new FormGroup({
      address: new FormControl('', [Validators.required]),
      movilPhone: new FormControl('', [Validators.required]),
      anotherPhone: new FormControl(''),
    });
  }

  constructor(    
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
        this.ids.push(t.id);
      });
    });

  }

  onSubmit() {    

    // Creating the order
    let obj: any[] = [];

    this.products.forEach(product => {
      let temp = {
        productOrders: product.orders.toString(),
        productName: product.name,
        productPrice: product.price.toString(),
        productTotalPrice: (product.orders * product.price).toString()
      }
      obj.push(temp);
    });

    this.order = {
      fk_user_order: parseInt(localStorage.getItem('id')),
      idproducts: JSON.stringify(this.ids),
      resume: JSON.stringify(obj),
      amount: this.products.length,
      totalPrice: this.totalprice,
      status: 'pending',

      nameReceiver: this.itemFormOne.get('name').value,
      lastnameReceiver: this.itemFormOne.get('lastname').value,
      ci: this.itemFormOne.get('ci').value,
      address: this.itemFormTwo.get('address').value,
      movilPhone: this.itemFormTwo.get('movilPhone').value,
      anotherPhone: this.itemFormTwo.get('anotherPhone').value,
    }

    // Uploading => orders => products, printing, etc
      this.orderService.postOrder(this.order).then(() => {
        this.products.forEach(t => {
          let formData: any = new FormData();
          formData.append('amount', (t.amount - t.orders));
          formData.append('orders', t.orders);
          console.log('url:', t.url);          
          this.productService.updateProduct(formData, t.url);
        });

        this.print();
        this.removeAllProduct();

        this.router.navigate(['/home']);
      });
   

  }

  removeAllProduct() {
    this.store.dispatch(new RemoveAllProduct())
  }

  print() {
    let fullName = localStorage.getItem('name') + " " + localStorage.getItem('lastname');
    let doc = new jsPDF();

    doc.setFont("times", "bold");
    doc.text("TIENDA VIRTUAL: VISTE BIEN", 70, 20);


    // top left
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(`ENVIADO POR: `, 20, 40);
    doc.setFont("times", "normal");
    doc.text(`${fullName}`, 68, 40);

    doc.setFont("times", "bold");
    doc.text(`A NOMBRE DE: `, 20, 48);
    doc.setFont("times", "normal");
    doc.text(`${this.itemFormOne.get('name').value} ${this.itemFormOne.get('lastname').value}`, 68, 48);

    doc.setFont("times", "bold");
    doc.text(`CI: `, 20, 56);
    doc.setFont("times", "normal");
    doc.text(`${this.itemFormOne.get('ci').value}`, 68, 56);

    doc.setFont("times", "bold");
    doc.text(`DIRECCIÓN: `, 20, 64);
    doc.setFont("times", "normal");
    doc.text(`${this.itemFormTwo.get('address').value}`, 68, 64);

    doc.setFont("times", "bold");
    doc.text(`TELÉF. MÓVIL: `, 20, 72);
    doc.setFont("times", "normal");
    doc.text(`${this.itemFormTwo.get('movilPhone').value}`, 68, 72);

    doc.setFont("times", "bold");
    doc.text(`TELÉF. OTRO: `, 20, 80);
    doc.setFont("times", "normal");
    doc.text(`${this.itemFormTwo.get('anotherPhone').value || '-'}`, 68, 80);


    // Lines
    doc.setLineWidth(0.1);
    doc.setDrawColor(0, 0, 0);

    doc.setLineDashPattern([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 7.5)
    doc.line(20, 90, 200, 90);


    // Content Banner
    doc.text('Cantidad', 20, 100);
    doc.text('Producto', 60, 100);
    doc.text('Precio', 100, 100);
    doc.text('Sub-Total', 140, 100);


    // Lines
    doc.setLineWidth(0.1);
    doc.setDrawColor(0, 0, 0);

    doc.setLineDashPattern([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 7.5)
    doc.line(20, 105, 200, 105);


    // Content
    let counter: number = 0;
    let mark: number
    this.products.forEach(product => {
      doc.text(product.orders.toString(), 20, (125 + counter));
      doc.text(product.name, 60, (125 + counter));
      doc.text(product.price.toString(), 100, (125 + counter));
      doc.text((product.orders * product.price).toString(), 140, (125 + counter));
      counter += 10;
      mark = 125 + counter;
    });

    // Total
    doc.text('Total:', 153, (mark + 15), null, "right");
    doc.text(this.totalprice.toString(), 156, (mark + 15));


    // Lines
    doc.setLineWidth(0.1);
    doc.setDrawColor(0, 0, 0);

    doc.setLineDashPattern([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 7.5)
    doc.line(20, (mark + 30), 200, (mark + 30));


    //  Footer
    doc.setFont("times", "bold");
    doc.text('ENTREGADO:', 20, (mark + 45));
    doc.text('NOMBRE:', 20, (mark + 53));
    doc.text('CI:', 20, (mark + 61));
    doc.text('FIRMA:', 20, (mark + 69));


    //  Save
    doc.save("Factura.pdf");
  }

}
