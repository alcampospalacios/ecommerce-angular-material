import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receiver } from './../model/receiver';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {
  BASE_URL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  update(receiver: Receiver) {
    let json = JSON.stringify(receiver);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post<Receiver>(`${this.BASE_URL}/receiver`, params, { headers: headers }).subscribe(data => {           
        console.log('response', data);      
    });
      
  }
}
