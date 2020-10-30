import { Products } from './../../../shared/model/products';
import { ProductsService } from './../../../shared/service/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';


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

  // Paginator Values
  page_size: number = 5;
  page_number: number = 1;

  isMouseOver: boolean = false;
  currentId: number;
  totalstars = "5";
  value = "5";

  viewLayoutProduct: string;
  isListViewMode: boolean = false;

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
  brandDynamic: any[] = [];
  products: Products[];
  copyProducts: Products[];
  copyProductsCategory: Products[];

  onlyOne: Products[];
  banner: string;
  defaultImage = '../../../assets/images/default/default-image.png';
  copyToResolveColorProducts: Products[];
  copyToResolveBrands: Products[];
  isActiveColor: boolean;
  isActiveSize: boolean;
  isActiveBrand: boolean;
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

        this.getBrands();
      });
  }




  filterColor() {
    if (!this.isActiveBrand && !this.isActiveSize) {
      this.products = [];
      this.colors.forEach(t => {
        if (t.completed) {
          this.getColor(t.value);
          this.isActiveColor = true;
        }
      });
    }

    if (this.isActiveBrand && !this.isActiveSize) {
      this.products = [];
      this.colors.forEach(s => {
        if (s.completed) {
          this.brandDynamic.forEach(t => {
            if (t.completed) {
              this.getMarkColor(t.name, s.value);
              this.isActiveColor = true;
            }
          });
        }
      });
    }

    if (!this.isActiveBrand && this.isActiveSize) {
      this.products = [];
      this.colors.forEach(s => {
        if (s.completed) {
          this.sizeDynamic.forEach(t => {
            if (t.completed) {
              this.getColorSize(s.value, t.name);
              this.isActiveColor = true;
            }
          });
        }
      });

    }

    if (this.isActiveBrand && this.isActiveSize) {
      this.products = [];
      this.colors.forEach(t => {
        if (t.completed) {
          this.sizeDynamic.forEach(s => {
            if (s.completed) {
              this.brandDynamic.forEach(v => {
                if (v.completed) {
                  this.isActiveColor = true;
                  this.getMarkColorSize(v.name, s.name, t.value);
                }
              });
            }
          });
        }
      });

    }

    if (this.colors.filter(t => t.completed).length === 0) {
      if (this.isActiveBrand) this.products = this.copyToResolveBrands;
      else this.products = this.copyProducts;

      this.isActiveColor = false;
    }
  }


  filterSize() {
    if (!this.isActiveColor) {
      this.products = [];
      this.sizeDynamic.forEach(t => {
        if (t.completed) {
          console.log('must be this.cat the problem');
          this.getCategorySize(this.category, t.name);
          this.isActiveSize = true;
        }
      });

    } else {
      this.products = [];
      this.colors.forEach(t => {
        if (t.completed) {
          this.sizeDynamic.forEach(s => {
            if (s.completed) {
              this.getCategorySizeColor(this.category, t.value, s.name);
              this.isActiveSize = true;
            }
          });
        }
      });

    }

    if (this.sizeDynamic.filter(t => t.completed).length === 0) {
      if (this.isActiveColor) this.products = this.copyToResolveColorProducts;
      else this.products = this.copyProducts;
      this.isActiveSize = false;
    }


  }

  filterMark() {
    if (!this.isActiveColor && !this.isActiveSize) {
      this.products = [];
      this.brandDynamic.forEach(t => {
        if (t.completed) {
          this.isActiveBrand = true;
          this.getMark(t.name);
        }
      });
    }

    if (this.isActiveColor && !this.isActiveSize) {
      this.products = [];
      this.colors.forEach(t => {
        if (t.completed) {
          this.brandDynamic.forEach(s => {
            if (s.completed) {
              this.isActiveBrand = true;
              this.getMarkColor(s.name, t.value);
            }
          });
        }
      });
    }

    if (!this.isActiveColor && this.isActiveSize) {
      this.products = [];
      this.sizeDynamic.forEach(t => {
        if (t.completed) {
          this.brandDynamic.forEach(s => {
            if (s.completed) {
              this.isActiveBrand = true;
              this.getMarkSize(s.name, t.name);
            }
          });
        }
      });
    }

    if (this.isActiveColor && this.isActiveSize) {
      this.products = [];
      this.colors.forEach(c => {
        if (c.completed) {
          this.sizeDynamic.forEach(t => {
            if (t.completed) {
              this.brandDynamic.forEach(s => {
                if (s.completed) {
                  this.isActiveBrand = true;
                  this.getMarkSizeColor(s.name, t.name, c.value);
                }
              });
            }
          });
        }
      });
    }

    if (this.brandDynamic.filter(t => t.completed).length === 0) {
      if (this.isActiveColor) this.products = this.copyToResolveColorProducts;
      else this.products = this.copyProducts;
      this.isActiveBrand = false;
    }

  }

  filterPrice() {
    if (!this.isActiveColor && !this.isActiveSize && !this.isActiveBrand) {
      this.products = [];
      this.getPrice(this.sliderValue);
    }

    if (this.isActiveColor && !this.isActiveSize && !this.isActiveBrand) {
      this.products = [];
      this.colors.forEach(t => {
        if (t.completed) {
          this.getPriceColor(this.sliderValue, t.value);
        }
      });
    }

    if (!this.isActiveColor && this.isActiveSize && !this.isActiveBrand) {
      this.products = [];
      this.sizeDynamic.forEach(t => {
        if (t.completed) {
          this.getPriceSize(this.sliderValue, t.name);
        }
      });
    }

    if (!this.isActiveColor && !this.isActiveSize && this.isActiveBrand) {
      this.products = [];
      this.brandDynamic.forEach(t => {
        if (t.completed) {
          this.getPriceSize(this.sliderValue, t.name);
        }
      });
    }

    if (this.isActiveColor && this.isActiveSize && !this.isActiveBrand) {
      this.products = [];
      this.colors.forEach(c => {
        if (c.completed) {
          this.sizeDynamic.forEach(t => {
            if (t.completed) {
              this.getPriceColorSize(this.sliderValue, c.value, t.name);
            }
          });
        }
      });
    }

    if (this.isActiveColor && !this.isActiveSize && this.isActiveBrand) {
      this.products = [];
      this.colors.forEach(c => {
        if (c.completed) {
          this.brandDynamic.forEach(t => {
            if (t.completed) {
              this.getPriceColorBrand(this.sliderValue, c.value, t.name);
            }
          });
        }
      });
    }

    if (!this.isActiveColor && this.isActiveSize && this.isActiveBrand) {
      this.products = [];
      this.sizeDynamic.forEach(s => {
        if (s.completed) {
          this.brandDynamic.forEach(t => {
            if (t.completed) {
              this.getPriceSizeBrand(this.sliderValue, s.name, t.name);
            }
          });
        }
      });
    }

    if (this.isActiveColor && this.isActiveSize && this.isActiveBrand) {
      this.products = [];
      this.colors.forEach(c => {
        if (c.completed) {
          this.sizeDynamic.forEach(t => {
            if (t.completed) {
              this.brandDynamic.forEach(s => {
                if (s.completed) {                  
                  this.getPriceColorSizeBrand(this.sliderValue, c.value, t.name, s.name);
                }
              });
            }
          });
        }
      });
    }

    if (!this.sliderValue || this.sliderValue === 0) {
      if (this.isActiveColor) this.products = this.copyToResolveColorProducts;
      else this.products = this.copyProducts;
      this.isActiveBrand = false;
    }


  }

  // new idea of handle data more optimized

  getCategory(category: string) {
    this.category = category;
    this.sizeDynamic = [];
    this.products = [];
    this.copyProducts.forEach(t => {
      if (t.category === category) this.products.push(t);
    });

    this.products.forEach(t => {
      if (t.size) {
        let obj = {
          name: t.size.toUpperCase(),
          completed: false,
          color: 'warn'
        }
        if (this.sizeDynamic.filter(s => { if (t.size.toUpperCase() === s.name.toString()) return t.size; }).length === 0)
          this.sizeDynamic.push(obj);

      }
    });

  }

  getBrands() {
    this.copyProducts.forEach(t => {
      if (t.mark) {
        let obj = {
          name: t.mark.toUpperCase(),
          completed: false,
          color: 'warn'
        }
        if (this.brandDynamic.filter(s => { if (t.mark.toUpperCase() === s.name.toString()) return t.size; }).length === 0)
          this.brandDynamic.push(obj);
      }
    });
  }

  getColor(color: string) {
    if (this.category) {
      this.copyProducts.forEach(t => {
        if (t.category === this.category && t.color === color) this.products.push(t);
      });
      this.copyToResolveColorProducts = this.products;
    } else {
      this.copyProducts.forEach(t => {
        if (t.color === color) this.products.push(t);
      });
      this.copyToResolveColorProducts = this.products;
    }
  }


  getCategorySize(category: string, size: string) {
    this.copyProducts.forEach(t => {
      if (t.category === category && t.size.toUpperCase() === size) this.products.push(t);
    });
  }

  getCategorySizeColor(category: string, color: string, size: string) {
    this.copyProducts.forEach(t => {
      if (t.category === category && t.color === color && t.size.toUpperCase() === size) this.products.push(t);
    });
  }

  getColorSize(color: string, size: string) {
    this.copyProducts.forEach(t => {
      if (t.color === color && t.size.toUpperCase() === size) this.products.push(t);
    });
  }

  getMarkColorSize(mark: string, size: string, color: string) {
    this.copyProducts.forEach(t => {
      if (t.mark.toUpperCase() === mark && t.size.toUpperCase() === size && t.color === color) this.products.push(t);
    });
  }


  getMark(mark: string) {
    this.copyProducts.forEach(t => {
      if (t.mark.toUpperCase() === mark) this.products.push(t);
    });

    this.copyToResolveBrands = this.products;
  }

  getMarkColor(mark: string, color: string) {
    this.copyProducts.forEach(t => {
      if (t.mark.toUpperCase() === mark && t.color === color) this.products.push(t);
    });
  }

  getMarkSize(mark: string, size: string) {
    this.copyProducts.forEach(t => {
      if (t.mark.toUpperCase() === mark && t.size.toUpperCase() === size) this.products.push(t);
    });
  }

  getMarkSizeColor(mark: string, size: string, color: string) {
    this.copyProducts.forEach(t => {
      if (t.mark.toUpperCase() === mark && t.size.toUpperCase() === size && t.color === color) {
        this.products.push(t);
      }
    });
  }

  getPrice(sliderValue: number) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue) this.products.push(t);
    });
  }

  getPriceColor(sliderValue: number, color: string) {   
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.color === color) this.products.push(t);
    });
  }
  
  getPriceSize(sliderValue: number, size: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.size.toUpperCase() === size) this.products.push(t);
    });
  }
  
  getPriceBrand(sliderValue: number, mark: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.mark.toUpperCase() === mark) this.products.push(t);
    });
  }

  getPriceSizeBrand(sliderValue: number, size: string, mark: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.size.toUpperCase() === size
       && t.mark.toUpperCase() === mark) this.products.push(t);
    });
  }

  getPriceColorBrand(sliderValue: number, color: string, brand: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.color === color && t.mark.toUpperCase() === brand) this.products.push(t);
    });
  }
  
  getPriceColorSize(sliderValue: number, color: string, size: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.color === color && t.size.toUpperCase() === size) this.products.push(t);
    });
  }

  getPriceColorSizeBrand(sliderValue: number, color: string, size: string, brand: string) {
    this.copyProducts.forEach(t => {
      if (t.price >= 0 && t.price <= sliderValue && t.color === color
       && t.size.toUpperCase() === size && t.mark.toUpperCase() === brand) this.products.push(t);
    });
  }


  // Handle Paginator
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
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





  // getDataTypeByCategory(category: string) {
  //   this.category = category;
  //   this.sizeDynamic = [];
  //   this.productservice.getTypeProductsByCategory(this.type, this.category).subscribe(data => {
  //     this.products = data;
  //     this.products.forEach(t => {
  //       if (t.size) {
  //         let obj = {
  //           name: t.size.toUpperCase(),
  //           completed: false,
  //           color: 'warn'
  //         }
  //         this.sizeDynamic.push(obj);
  //       }
  //     });
  //     this.copyProducts = this.products;
  //   });
  // }

  // getDataTypeByColor(color: string) {
  //   if (this.category) {
  //     this.productservice.getTypeProductsByCategoryAndColor(this.type, this.category, color).subscribe(data => {
  //       this.products = this.products.concat(data);
  //       this.copyToResolveColorProducts = this.products;
  //     });
  //   } else {
  //     this.productservice.getTypeProductsByColor(this.type, color).subscribe(data => {
  //       this.products = this.products.concat(data);
  //       this.copyToResolveColorProducts = this.products;
  //     });
  //   }
  // }

  // getDataByCategorySize(category: string, size: string) {
  //   this.productservice.getTypeProductsByCategorySize(category, size).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }

  // getDataByCategorySizeColor(category: string, color: string, size: string) {
  //   this.productservice.getTypeProductsByCategorySizeColor(category, color, size).subscribe(data => {
  //     this.products = this.products.concat(data);
  //     this.copyToResolveColorProducts = this.products;
  //   });
  // }

  // getDataByColorSize(color: string, size: string) {
  //   this.productservice.getTypeProductsByColorSize(this.type, color, size).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }

  // getDataByMarkColorSize(mark: string, size: string, color: string) {
  //   this.productservice.getTypeProductsByMarkSizeColor(this.type, mark, size, color).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }


  // getDataByMark(mark: string) {
  //   this.productservice.getTypeProductsByMark(mark).subscribe(data => {
  //     this.products = this.products.concat(data);
  //     this.copyToResolveBrands = this.products;
  //   });
  // }

  // getDataByMarkColor(mark: string, color: string) {
  //   this.productservice.getTypeProductsByMarkColor(mark, color).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }

  // getDataByMarkSize(mark: string, size: string) {
  //   this.productservice.getTypeProductsByMarkColor(mark, size).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }

  // getDataByMarkSizeColor(mark: string, size: string, color: string) {
  //   this.productservice.getTypeProductsByMarkSizeColor(this.type, mark, size, color).subscribe(data => {
  //     this.products = this.products.concat(data);
  //   });
  // }
