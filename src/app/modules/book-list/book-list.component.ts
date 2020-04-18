import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { BookService } from '../services/book.service';
import { Book } from 'src/app/model/book';
import { SharedService } from 'src/app/util/shared.service';
import { SortingType } from 'src/app/model/sorting-type';
import { SortingDirection } from 'src/app/model/sorting-direction';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  componentActive = true;
  isLoading = false;
  books: Book[];
  routeHeader = 'Преглед књига';
  defaultImageLink = 'https://drive.google.com/uc?id=14j6qOgRXWJD6TtsHQF9ZN5iBogfsoJwt';
  sortingType = SortingType.TITLE.toString();
  sortingDirection = SortingDirection.ASC.toString();

  constructor(
    private bookService: BookService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.routeHeader);
    this.getBooks();
  }

  getBooks() {
    this.isLoading = true;

    this.bookService.getAll(this.sortingType, this.sortingDirection)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        books => {
          this.isLoading = false;
          this.books = books;
        },
        () => this.isLoading = false
      );
  }

  bookDetails(id: string) {
    this.router.navigate(['/knjiga', id]);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
