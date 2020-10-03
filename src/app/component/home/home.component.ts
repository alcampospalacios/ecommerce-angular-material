import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  image1 = '../../../assets/carousel/man.jpg';
  image2 = '../../../assets/carousel/woman.jpg';
  colecction = [
    {
      id: 0,
      url: '../../../assets/collection/1.jpg',
      gender: 'HOMBRE',
      save: 'AHORRA 50%'
    },
    {
      id: 1,
      url: '../../../assets/collection/2.jpg',
      gender: 'MUJER',
      save: 'AHORRA 50%'
    }
  ];

  products = [
    {
      id: 2,
      idCarousel: "carouselIndicator1",
      url: '../../../assets/products/3.jpg',
      name: 'Vestido 1',
      price: '120'
    },
    {
      id: 3,
      idCarousel: "carouselIndicator2",
      url: '../../../assets/products/39.jpg',
      name: 'Vestido 2',
      price: '300'
    },
    {
      id: 4,
      idCarousel: "carouselIndicator3",
      url: '../../../assets/products/1.jpg',
      name: 'Vestido 3',
      price: '170'
    },
    {
      id: 5,
      idCarousel: "carouselIndicator4",
      url: '../../../assets/products/8.jpg',
      name: 'Vestido 4',
      price: '240'
    }
  ]

  productsOfferEspecial = [
    {
      id: 2,
      idCarousel: "carouselIndicatorOffer1",
      url: '../../../assets/products/3.jpg',
      name: 'Vestido 1',
      price: '120'
    },
    {
      id: 3,
      idCarousel: "carouselIndicatorOffer2",
      url: '../../../assets/products/39.jpg',
      name: 'Vestido 2',
      price: '300'
    },
    {
      id: 4,
      idCarousel: "carouselIndicatorOffer3",
      url: '../../../assets/products/1.jpg',
      name: 'Vestido 3',
      price: '170'
    },
    {
      id: 5,
      idCarousel: "carouselIndicatorOffer4",
      url: '../../../assets/products/8.jpg',
      name: 'Vestido 4',
      price: '240'
    }
  ]

  direction: any;
  breakpoint: any;
  totalstars = "5";
  value = "5";
  isMouseOver: boolean = false;
  currentId: number;
  carr: string = 'carouselIndicators1';

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
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

  doSomething() {
    console.log("Do Something");
  }

  consola() {
    console.log(this.currentId);
  }

}
