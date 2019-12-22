import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category } from 'src/app/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = '/category';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url}${this.categoryUrl}`);
  }

  getById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${environment.url}${this.categoryUrl}/${categoryId}`);
  }

  save(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.url}${this.categoryUrl}`, category);
  }

  remove(categoryId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.url}${this.categoryUrl}/${categoryId}`);
  }
}
