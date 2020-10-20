import { Products } from './../../../shared/model/products';
import { ProductsService } from './../../../shared/service/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  panelOpenState = true;
  panelOpenStateBrand = true;
  panelOpenStateColors = true;
  panelOpenStateSize = true;
  panelOpenStatePrice = true;
  sliderValue: number = 0;

  isMouseOver: boolean = false;
  currentId: number;
  totalstars = "5";
  value = "5";

  viewLayoutProduct: string;
  isListViewMode: boolean = false;


  brands: any[] = [
    { name: 'ZARA', completed: false, color: 'warn' },
    { name: 'DENIM', completed: false, color: 'warn' },
    { name: 'MADAME', completed: false, color: 'warn' },
    { name: 'BIBA', completed: false, color: 'warn' },
    { name: 'MAX', completed: false, color: 'warn' },
    { name: 'JEANS', completed: false, color: 'warn' }
  ]

  colors: any[] = [
    { name: 'Amarillo', classSpan: 'span-style-yellow', completed: false, value: 'yellow', color: 'warn' },
    { name: 'Azul', classSpan: 'span-style-blue', completed: false, value: 'blue', color: 'warn' },
    { name: 'Rojo', classSpan: 'span-style-red', completed: false, value: 'red', color: 'warn' },
    { name: 'Rosado', classSpan: 'span-style-pink', completed: false, value: 'pink', color: 'warn' },
    { name: 'Verde', classSpan: 'span-style-green', completed: false, value: 'green', color: 'warn' },
    { name: 'Blanco', classSpan: 'span-style-white', completed: false, value: 'white', color: 'warn' },
    { name: 'Negro', classSpan: 'span-style-black', completed: false, value: 'black', color: 'warn' }
  ]

  sizeDynamic: any[] = [];
  products: Products[];
  copyProducts: Products[];

  banner: string;
  defaultImage = '../../../assets/images/default/default-image.png';
  copyToResolveColorProducts: Products[];
  isActiveColor: boolean;
  type: string;
  category: string;

  constructor(private route: ActivatedRoute, private location: Location, private productservice: ProductsService) { }

  ngOnInit(): void {
    this.getDataType();
  }

  getDataType(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.type === 'hombre') {
      this.banner = '../../../assets/images/banner/banner-man.jpg';
    } else if (this.type === 'mujer') {
      this.banner = '../../../assets/images/banner/banner-woman-v1.jpg';
    }
    this.productservice.getTypeProducts(this.type)
      .subscribe(data => {
        this.products = data;
        this.copyProducts = this.products;
      });
  }

  getDataTypeByCategory(category: string) {
    this.category = category;
    this.sizeDynamic = [];
    this.productservice.getTypeProductsByCategory(this.type, this.category).subscribe(data => {
      this.products = data;
      this.products.forEach(t => {
        if (t.size) {
          let obj = {
            name: t.size.toUpperCase(),
            completed: false,
            color: 'warn'
          }
          this.sizeDynamic.push(obj);
        }
      });
      this.copyProducts = this.products;
    });
  }

  getDataTypeByColor(color: string) {
    if (this.category) {
      this.productservice.getTypeProductsByCategoryAndColor(this.type, this.category, color).subscribe(data => {
        this.products = this.products.concat(data);
        this.copyToResolveColorProducts = this.products;
      });
    } else {
      this.productservice.getTypeProductsByColor(this.type, color).subscribe(data => {
        this.products = this.products.concat(data);
        this.copyToResolveColorProducts = this.products;
      });
    }
  }

  updateColors() {
    this.products = [];
    this.colors.forEach(t => {
      if (t.completed) {
        this.getDataTypeByColor(t.value);
        this.isActiveColor = true;
      }
    });

    if (this.colors.filter(t => t.completed).length === 0) {
      this.products = this.copyProducts;
      this.isActiveColor = false;
    }
  }

  getDataByCategorySize(category: string, size: string) {
    this.productservice.getTypeProductsByCategorySize(category, size).subscribe(data => {
      this.products = this.products.concat(data);
    });
  }

  getDataByCategorySizeColor(category: string, color: string, size: string) {
    this.productservice.getTypeProductsByCategorySizeColor(category, color, size).subscribe(data => {
      this.products = this.products.concat(data);
    });
  }

  checkSize() {
    if (!this.isActiveColor) {
      this.products = [];
      this.sizeDynamic.forEach(t => {
        if (t.completed) this.getDataByCategorySize(this.category, t.name);        
      });

      if (this.sizeDynamic.filter(t => t.completed).length === 0) {
        if (this.isActiveColor) this.products = this.copyToResolveColorProducts;
        else this.products = this.copyProducts;        
      }

    } else {
      this.products = [];
      this.colors.forEach(t => {
        if(t.completed) {
          this.sizeDynamic.forEach(s => {
            if(s.completed) this.getDataByCategorySizeColor(this.category, t.value, s.name);
          });
        }
      });

      if (this.sizeDynamic.filter(t => t.completed).length === 0) {
        if (this.isActiveColor) this.products = this.copyToResolveColorProducts;
        else this.products = this.copyProducts;        
      }
    }
    
  }

  onMouseEnter(id) {
    this.currentId = id;
    this.isMouseOver = true;

  }
  onMouseLeave() {
    // this.currentId = null;
    this.isMouseOver = false;
  }


  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
