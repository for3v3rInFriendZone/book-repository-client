import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { BookService } from './modules/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BookService]
})
export class AppComponent {
  componentActive = true;
  loading: boolean;
  numberOfBooks: number;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.loading = true;

    this.bookService.getBooks()
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        books => {
          this.loading = false;
          this.numberOfBooks = books.length
        },
        () => this.loading = false
      );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
