import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { BookService } from '../services/book.service';
import { Book } from 'src/app/model/Book';
import { SharedService } from 'src/app/util/shared.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  componentActive = true;
  loading: boolean;
  books: Book[];
  routeHeader = 'Преглед књига';

  constructor(
    private bookService: BookService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.routeHeader);
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
          this.books = books;
        },
        () => this.loading = false
      );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
