import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService {
  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  postEmailSubscription(emailsubscription: string): Promise<any>{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let params = {
      emailSubscription: emailsubscription,
      owner: user.user_id
    }

    let headers = new HttpHeaders({
      'Authorization': 'token ' + user.token
    });


    let promise = new Promise<void>((resolve, reject) => {
      this.http.post<any>(`${this.API_URL}/subscriber/`, params, { headers: headers }).subscribe((response) => {
        localStorage.setItem('subscription', JSON.stringify(response));
        resolve();
      }, err => {
        reject();
      });
    });

    return promise;
  }

  deleteSubscription(id: number): Promise<any> {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;

    let headers = new HttpHeaders({
      'Authorization': 'token ' + token
    });

    let promise = new Promise<void>((resolve, reject) => {
      this.http.delete<any>(`${this.API_URL}/subscriber/${id}/`, { headers: headers }).subscribe(() => {
        localStorage.removeItem('subscription');
        resolve();
      }, err => {
        reject();
      });
    });

    return promise;
  }
  
}
