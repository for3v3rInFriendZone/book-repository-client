import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

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

  showSuccess(text: string) {
    this.snackBar.open(text, '', {
      duration: 2300,
    });
  }
}
