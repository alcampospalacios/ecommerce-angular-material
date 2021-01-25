import { Orders } from './../model/orders';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  postOrder(order: Orders): Promise<any> {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;

    let headers = new HttpHeaders({
      'Authorization': 'token ' + token
    });

    let promise = new Promise<void>((resolve, reject) => {
      this.http.post<Orders>(`${this.API_URL}/order/`, order, { headers: headers }).subscribe(response => {
        resolve();
      }, err => {
        reject();
      });
    });
    
    return promise
  }

}
