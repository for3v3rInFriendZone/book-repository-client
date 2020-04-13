import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentUrlSubject = new Subject<string>();
  private numberOfBooks: number;

  sendMessage(message: string) {
    this.currentUrlSubject.next(message);
  }

  getMessage(): Observable<string> {
    return this.currentUrlSubject.asObservable();
  }

  setNumberOfBooks(number: number) {
    this.numberOfBooks = number;
  }

  getNumberOfBooks() {
    return this.numberOfBooks;
  }
}
