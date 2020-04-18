import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/util/shared.service';
import { Book } from 'src/app/model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { BookService } from '../services/book.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  componentActive = true;
  bookDetailsRoute = 'Детаљи књиге';
  book = {} as Book;
  bookId: string;
  defaultImageLink = 'https://drive.google.com/uc?id=14j6qOgRXWJD6TtsHQF9ZN5iBogfsoJwt';
  bookCategories: string[];

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.bookDetailsRoute);
    this.getBookId();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  getBookId() {
    this.activatedRoute.params.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      params => {
        this.bookId = params['id'];
        this.getBookById(this.bookId);
      }
    )
  }

  goToEditBook() {
    const editBookRoute = `knjiga/${this.bookId}/izmena`;

    this.router.navigate([editBookRoute]);
  }


  removeBook() {
    this.bookService.remove(this.bookId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        () => {
          this.sharedService.showToastMessage('Књига је успешно обрисана!');
          this.sharedService.setNumberOfBooks(this.sharedService.getNumberOfBooks() - 1);
          this.router.navigate(['/naslovna']);
        },
        err => console.log(err)
      );
  }

  private getBookById(bookId: string) {
    this.bookService.getById(bookId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        book => {
          this.book = book;
        }
      );
  }
}

