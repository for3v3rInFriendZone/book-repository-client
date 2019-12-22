import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Book } from 'src/app/model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksUrl = '/book';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.url}${this.booksUrl}`);
  }

  getById(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.url}${this.booksUrl}/${id}`);
  }

  save(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.url}${this.booksUrl}`, book);
  }
}
