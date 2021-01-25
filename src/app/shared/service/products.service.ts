import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BASE_URL = 'http://localhost:8000/api';

  products: Observable<Products[]>;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/product/`);
  }
  
  getTypeProductsByCategory(type: string, category: string): Observable<Products[]> {    
    return this.http.get<Products[]>(`${this.BASE_URL}/filterproduct?${category}&type=${type}`);
  }

  getProductsById(id): Observable<Products> {
    return this.http.get<Products>(`${this.BASE_URL}/product/${id}/`);
  }


  getTypeProducts(type: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/filterproduct?type=${type}`);
  }

  getProductsCategory(category: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/filterproduct?category=${category}`);
  }


  // getTypeProductsByCategoryAndColor(type: string, category: string, color: string): Observable<Products[]> {
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filtercategoryColor/${type}/${category}/${color}`);
  // }

  // getTypeProductsByColor(type: string, color: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterColor/${type}/${color}`);
  // }

  // getTypeProductsByColorSize(type: string, color: string, size: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterColorSize/${type}/${color}/${size}`);
  // }
  
  // getTypeProductsByCategorySize(category: string, size: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterSize/${category}/${size}`);
  // }

  // getTypeProductsByCategorySizeColor(category: string, color: string, size: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterSizeColor/${category}/${color}/${size}`);
  // }

  // getTypeProductsByMark(mark: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterMark/${mark}`);
  // }

  // getTypeProductsByMarkColor(mark: string, color: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterMark/${mark}/${color}`);
  // }

  // getTypeProductsByMarkSize(mark: string, size: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterMarkSize/${mark}/${size}`);
  // }

  // getTypeProductsByMarkSizeColor(type: string, mark: string, size: string, color: string): Observable<Products[]> {    
  //   return this.http.get<Products[]>(`${this.BASE_URL}/filterMarkSizeColor/${type}/${mark}/${size}/${color}`);
  // }

  updateProduct(formData: FormData, url) {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;

    let headers = new HttpHeaders({
      'Authorization': 'token ' + token
    });

    this.http.patch<Products>(`${url}`, formData, { headers: headers }).subscribe(response => {
      console.log(response);
    }); 
  }

  getBestSellingProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/filterproduct?featured=True`);
  }

  getNewestViewedSoldout(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.BASE_URL}/filterproduct?newest=True`);
  }
  
}
