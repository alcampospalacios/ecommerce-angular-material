import { Orders } from './../model/orders';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  postOrder(order: Orders) {
    let json = JSON.stringify(order);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   
      this.http.post(`${this.BASE_URL}/orders`, params, { headers: headers }).subscribe(data => {        
        console.log('Done', data);
    });  
  }

}
