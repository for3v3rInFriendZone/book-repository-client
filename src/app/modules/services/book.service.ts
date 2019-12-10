import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Book } from 'src/app/model/Book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksUrl = '/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.url}${this.booksUrl}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.url}${this.booksUrl}`, book);
  }
}
