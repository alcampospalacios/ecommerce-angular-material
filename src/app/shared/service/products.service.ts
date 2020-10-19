import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BASE_URL = 'http://localhost:3000/products';

  products: Observable<Products[]>;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.BASE_URL);
  }

  getTypeProducts(type: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/${type}`);
  }

  getTypeProductsByCategory(type: string, category: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/${type}/${category}`);
  }

  getTypeProductsByCategoryAndColor(type: string, category: string, color: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/${type}/${category}/${color}`);
  }

  getTypeProductsByColor(type: string, color: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/colormark/${type}/${color}`);
  }
}
