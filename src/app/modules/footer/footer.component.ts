import { Component, OnInit } from '@angular/core';

import { BookService } from '../services/book.service';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { SharedService } from 'src/app/util/shared.service';
import { SortingType } from 'src/app/model/sorting-type';
import { SortingDirection } from 'src/app/model/sorting-direction';

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

    this.bookService.getAll(SortingType.TITLE.toString(), SortingDirection.ASC.toString())
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
