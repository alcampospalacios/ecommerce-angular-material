import { Subscription } from 'rxjs';
import { ProductsService } from './../../shared/service/products.service';
import { Products } from './../../shared/model/products';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

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

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private prod: ProductsService) {
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
 

}
