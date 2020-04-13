import { Component, OnInit } from '@angular/core';

import { BookService } from '../services/book.service';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { SharedService } from 'src/app/util/shared.service';

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
    private bookService: BookService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.loading = true;

    this.bookService.getAll()
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        books => {
          this.loading = false;
          this.sharedService.setNumberOfBooks(books.length);
        },
        () => this.loading = false
      );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
