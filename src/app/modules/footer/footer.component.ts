import { Component, OnInit } from '@angular/core';

import { BookService } from '../services/book.service';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
