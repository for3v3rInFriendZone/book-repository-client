import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { CategoryService } from '../services/category.service';
import { Category } from 'src/app/model/category';
import { BookService } from '../services/book.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  componentActive = true;
  bookId: string;
  newBookRoute = 'Унос књиге';
  editBookRoute = 'Измена књиге';
  keepingPlaces = ['Нови Сад', 'Факултет', 'Стара Пазова', 'Друго'];
  formArray = ['Папирна', 'Електронска'];
  bookForm: FormGroup;
  availableCategories: Category[];
  book = {} as Book;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.determineTheRoute();
  }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        categories => this.availableCategories = categories
      );
  }

  determineTheRoute() {
    this.activatedRoute.params
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        params => {
          this.bookId = params['id'];
          if (this.bookId) {
            this.sharedService.sendMessage(this.editBookRoute);
            this.getBookById(this.bookId);
          } else {
            this.sharedService.sendMessage(this.newBookRoute);
            this.createForm();
          }
        }
      );
  }

  getBookById(bookId: string) {
    this.bookService.getBookById(bookId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        book => {
          this.book = book;
          this.createForm();
        }
      );
  }

  saveBook() {
    if (this.bookForm.invalid) {
      console.log('Invalid form!');
    }
    const newBook: Book = this.bookForm.value;
    newBook.authors = this.getAuthors(this.bookForm.value.authors);

    this.bookService.saveBook(newBook)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        savedBook => {
          console.log(savedBook);
        },
        err => console.log(err)
      );
  }

  clearBookForm() {
    this.bookForm.reset();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  private getAuthors(authors: string): string[] {
    if (authors) {
      if (authors.split(',').length > 0) {
        return authors.split(',');
      }

      return [authors];
    }

    return [];
  }

  private createForm() {
    this.bookForm = this.fb.group({
      title: new FormControl(this.book.title),
      authors: new FormControl(this.book.authors),
      publisher: new FormControl(this.book.publisher),
      publication: new FormControl(this.book.publication),
      publishedYear: new FormControl(this.book.publishedYear),
      numberOfPages: new FormControl(this.book.numberOfPages),
      publicationLanguage: new FormControl(this.book.publicationLanguage),
      form: new FormControl(this.book.form),
      keepingPlace: new FormControl(this.book.keepingPlace),
      categories: new FormControl(this.book.categories),
      inventoryNumber: new FormControl(this.book.inventoryNumber)
    });
  }
}
