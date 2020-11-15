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

  getProductsById(id): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/identifier/${id}`);
  }

  getTypeProducts(type: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/${type}`);
  }

  getTypeProductsByCategory(type: string, category: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/category/${type}/${category}`);
  }

  getTypeProductsByCategoryAndColor(type: string, category: string, color: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/filtercategoryColor/${type}/${category}/${color}`);
  }

  getTypeProductsByColor(type: string, color: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterColor/${type}/${color}`);
  }

  getTypeProductsByColorSize(type: string, color: string, size: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterColorSize/${type}/${color}/${size}`);
  }
  
  getTypeProductsByCategorySize(category: string, size: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterSize/${category}/${size}`);
  }

  getTypeProductsByCategorySizeColor(category: string, color: string, size: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterSizeColor/${category}/${color}/${size}`);
  }

  getTypeProductsByMark(mark: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterMark/${mark}`);
  }

  getTypeProductsByMarkColor(mark: string, color: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterMark/${mark}/${color}`);
  }

  getTypeProductsByMarkSize(mark: string, size: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterMarkSize/${mark}/${size}`);
  }

  getTypeProductsByMarkSizeColor(type: string, mark: string, size: string, color: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterMarkSizeColor/${type}/${mark}/${size}/${color}`);
  }
  
}
