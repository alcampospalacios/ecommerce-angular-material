import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationNodeService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signup(user: User): Promise<any> {
    let json = JSON.stringify(user);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let promise = new Promise((resolve, reject) => {
      this.http.post(`${this.BASE_URL}/signup`, params, { headers: headers }).subscribe(data => {        
        resolve();
      }, err => {        
        reject();
      });

    });
    return promise;
  }

  signin(user: User): Promise<any> {
    let json = JSON.stringify(user);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let promise = new Promise((resolve, reject) => {
      this.http.post<User>(`${this.BASE_URL}/signin`, params, { headers: headers }).subscribe(data => {
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('lastname', data.lastname);
        localStorage.setItem('id', data.id.toString());     
        resolve();
      }, err => {        
        reject();
      });
      
    });
    return promise;    
  }


  update(user: User) {
    let json = JSON.stringify(user);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post<User>(`${this.BASE_URL}/user`, params, { headers: headers }).subscribe(data => {           
        console.log('response', data);      
    });
      
  }
  
  logout() {
    this.http.get(`${this.BASE_URL}/logout`).subscribe(result => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('id');
    });

  }

}
