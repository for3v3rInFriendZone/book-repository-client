import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { CategoryService } from '../services/category.service';
import { Category } from 'src/app/model/category';
import { BookService } from '../services/book.service';
import { Book } from 'src/app/model/book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  componentActive = true;
  bookId: string;
  isEdit = false;
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
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.determineTheRoute();
  }

  getCategories() {
    this.categoryService.getAll()
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
            this.isEdit = true;
            this.getBookById(this.bookId);
          } else {
            this.sharedService.sendMessage(this.newBookRoute);
            this.createForm();
          }
        }
      );
  }

  submitForm() {
    if (this.bookForm.invalid) {
      console.log('Invalid form!');

      return;
    }

    if (this.isEdit) {
      this.updateBook(this.bookId);
    } else {
      this.createBook();
    }
  }

  removeBook() {
    this.bookService.remove(this.bookId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        () => {
          this.showSuccess('Књига је успешно обрисана!');
          this.route.navigate(['/naslovna']);
        },
        err => console.log(err)
      );
  }

  clearForm() {
    this.bookForm.reset();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  private updateBook(bookId: string) {
    const editedBook = { ...this.book, ...this.bookForm.value };
    
    this.bookService.update(bookId, editedBook)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        () => {
          this.showSuccess('Успешно сачувана књига!');
          this.route.navigate(['/knjige']);
        },
        err => console.log(err)
      );
  }

  private createBook() {
    const newBook: Book = this.bookForm.value;
    newBook.authors = this.getAuthors(this.bookForm.value.authors);

    this.bookService.create(newBook)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        () => {
          this.showSuccess('Књига је успешно направљена!');
          this.clearForm();
        },
        err => console.log(err)
      );
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

  private getBookById(bookId: string) {
    this.bookService.getById(bookId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        book => {
          this.book = book;
          this.createForm();
        }
      );
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
      inventoryNumber: new FormControl(this.book.inventoryNumber),
      image: new FormControl(this.book.image)
    });
  }

  private showSuccess(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
    });
  }
}
