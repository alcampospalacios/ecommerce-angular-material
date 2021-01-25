import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationNodeService {
  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signup(user: User): Promise<any> {
    let json = JSON.stringify(user);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let promise = new Promise<void>((resolve, reject) => {
      this.http.post(`${this.API_URL}/signup`, params, { headers: headers }).subscribe(data => {
        resolve();
      }, err => {
        reject();
      });

    });
    return promise;
  }

  login(username: string, password: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let promise = new Promise<void>((resolve, reject) => {
      this.http.post<any>(`${this.API_URL}/auth/`, { username, password }, { headers: headers }).subscribe(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('username', user.username);
          this.router.navigate(['home']);
        }
        resolve();
      }, err => {
        reject();
      });
    });

    return promise;

  }

  getCurrentUser(): Boolean {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['home']);
  }

}
