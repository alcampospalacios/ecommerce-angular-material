import { Subscription } from 'rxjs';
import { ProductsService } from './../../shared/service/products.service';
import { Products } from './../../shared/model/products';
import { Component, OnDestroy, OnInit, AfterViewInit, Inject } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProduct, UpdateProduct } from 'src/app/shared/statate-management/product.actions';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {  
  image1 = '../../../assets/carousel/model.jpg';
  image2 = '../../../assets/carousel/w.jpg';
  image3 = '../../../assets/carousel/boy.jpg';
  image4 = '../../../assets/carousel/girl.jpg';
  defaultImage = '../../../assets/images/default/default-image.png';
  colecction = [
    {
      id: 0,
      url: '../../../assets/collection/1.1.jpg',
      gender: 'HOMBRE',
      save: 'AHORRA 50%'
    },
    {
      id: 1,
      url: '../../../assets/collection/2.2.jpg',
      gender: 'MUJER',
      save: 'AHORRA 50%'
    }
  ];

  bestSellingProducts: Products [];
  newestViewedSoldout: Products [];
  filternewestViewedSoldout: Products [];
  subscriptionBestSellingProducts: Subscription;
  subscriptionNewestViewedSoldout: Subscription; 

  direction: any;
  breakpoint: any;
  totalstars = "5";
  value = "5";
  isMouseOver: boolean = false;
  currentId: number;  

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private prod: ProductsService,
    public dialog: MatDialog,
    private store: Store
    ) {
    iconRegistry.addSvgIcon(
      'custom_shopping_cart',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cardProducts/shopping_cart-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_search',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cardProducts/search-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_favorite',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cardProducts/favorite_border-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'delivery_trunk',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/sectionInformation/trunk.svg'));
  }

  ngOnInit(): void {    
  }

  ngAfterViewInit(): void {
    this.prod.getBestSellingProduct().subscribe(data => {
      this.bestSellingProducts = data;      
    });

    this.prod.getNewestViewedSoldout().subscribe(data => {      
      this.newestViewedSoldout = data;
      this.newest();
    });    
  }

  ngOnDestroy(): void {    
  }

  sliderOn(event) {
    this.direction = event.direction;
  }

  onMouseEnter(id) {
    this.currentId = id;
    this.isMouseOver = true;

  }
  onMouseLeave() {
    // this.currentId = null;
    this.isMouseOver = false;
  }

  openDialog(item: Products): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '80%',
      height: '80%',
      data: {
        id: item.id,
        type: item.type,
        category: item.category,        
        name: item.name,
        description: item.description,
        price: item.price,
        subImage1: item.subImage1,
        size: item.size,
        color: item.color
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  newest() {    
    this.filternewestViewedSoldout = this.newestViewedSoldout.filter(t => t.newest == true);    
  }

  viewed() {
    this.filternewestViewedSoldout = this.newestViewedSoldout.filter(t => t.orders >= 5); 
  }
  
  featured() {
    this.filternewestViewedSoldout = this.newestViewedSoldout.filter(t => t.featured == true); 
  }
  
  soldOut() {
    this.filternewestViewedSoldout = this.newestViewedSoldout.filter(t => {
      t.amount-t.orders === 0
    }); 
  }

  addProductSM(product: Products) {    
    if (product.amount > product.orders) {
      let solution: Products[];
      this.store.select(state => state.products.products).subscribe(data => {
        solution = data
      });

      let flag = false;
      if (solution.length === 0) {
        let prod: Products = {
          id: product.id,
          url: product.url,
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
          orders: 1
        }
        this.store.dispatch(new AddProduct(prod));
      }
      else {
        solution.forEach(it => {
          if (it.id == product.id) {
            let prod: Products = {
              id: product.id,
              url: product.url,
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
  
              orders: ((it.orders || 0) + 1)
            }
            flag = true;
            this.updateOrder(prod);
          }
        });

        if (!flag) {
          let prod: Products = {
            id: product.id,
            url: product.url,
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
            orders: 1
          }

          this.store.dispatch(new AddProduct(prod));
        }

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




// Dialog class
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {
  orderFormControl = new FormControl('', [
    Validators.required,
    Validators.min(10)
  ]);

  ord: number;
  dynamicStyle: string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: Products,
    private store: Store
  ) {
    this.dynamicStyle = `background-color: ${data.color}; height: 20px; width: 20px; border-radius: 100%; margin-right: 5px; display: inline-block;`
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
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
        url: product.url,
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
            url: product.url,
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
          url: product.url,
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
