import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService {
  BASE_URL = 'http://localhost:3000/emailsubscription';

  constructor(private http: HttpClient) { }

  postEmailSubscription(emailsubscription: string): Promise<any>{
    let emailObject = {emailsubscription: emailsubscription}
    let json = JSON.stringify(emailObject);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');    

    let promise = new Promise<void>((resolve, reject) => {
      this.http.post(`${this.BASE_URL}`, params, { headers: headers }).subscribe(data => {    
        resolve();
      }, err => {        
        reject();
      });

    });

    return promise;
  }
  
}
