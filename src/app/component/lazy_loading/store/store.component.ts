import { Component, OnInit, ViewChild } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';


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
    {name: 'ZARA', completed: false, color: 'warn'},
    {name: 'DENIM', completed: false, color: 'warn'},
    {name: 'MADAME', completed: false, color: 'warn'},
    {name: 'BIBA', completed: false, color: 'warn'},
    {name: 'MAX', completed: false, color: 'warn'},
    {name: 'JEANS', completed: false, color: 'warn'}
  ]

  colors: any[] = [
    {name: 'YELLOW', completed: false, color: 'warn'},
    {name: 'BLUE', completed: false, color: 'warn'},
    {name: 'RED', completed: false, color: 'warn'},
    {name: 'PINK', completed: false, color: 'warn'},
    {name: 'GREEN', completed: false, color: 'warn'},
    {name: 'WHITE', completed: false, color: 'warn'}
  ]

  size: any[] = [
    {name: 'S', completed: false, color: 'warn'},
    {name: 'M', completed: false, color: 'warn'},
    {name: 'L', completed: false, color: 'warn'},
    {name: 'XS', completed: false, color: 'warn'}   
  ]

  banner: string =  '../../../assets/images/banner/collection-banner.jpg'

  products = [
    {
      id: 2,
      idCarousel: "carouselIndicator1",
      url: '../../../assets/products/3.jpg',
      name: 'Vestido 1',
      price: '120',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
    },
    {
      id: 3,
      idCarousel: "carouselIndicator2",
      url: '../../../assets/products/39.jpg',
      name: 'Vestido 2',
      price: '300',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'

    },
    {
      id: 4,
      idCarousel: "carouselIndicator3",
      url: '../../../assets/products/1.jpg',
      name: 'Vestido 3',
      price: '170',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'

    },
    {
      id: 5,
      idCarousel: "carouselIndicator4",
      url: '../../../assets/products/8.jpg',
      name: 'Vestido 4',
      price: '240',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'

    }
  ]

  constructor() { }

  ngOnInit(): void {   
  }

  updateAllComplete() {
   console.log(this.brands.every(t => t.completed));
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
