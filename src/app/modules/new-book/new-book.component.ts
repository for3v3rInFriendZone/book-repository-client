import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { CategoryService } from '../services/category.service';
import { Category } from 'src/app/model/category';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit, OnDestroy {

  componentActive = true;
  routeHeader = 'Унос књиге';
  keepingPlaces = ['Нови Сад', 'Факултет', 'Стара Пазова', 'Друго'];
  formArray = ['Папирна', 'Електронска'];
  bookForm: FormGroup;
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.createForm();
    this.sharedService.sendMessage(this.routeHeader);
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        categories => this.categories = categories
      );
  }

  saveBook() {
    console.log(this.bookForm.value);

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
      title: new FormControl(''),
      authors: new FormControl(''),
      publisher: new FormControl(''),
      publication: new FormControl(''),
      publishedYear: new FormControl(''),
      numberOfPages: new FormControl(''),
      publicationLanguage: new FormControl('0'),
      form: new FormControl('0'),
      keepingPlace: new FormControl('0'),
      categories: new FormControl(''),
      inventoryNumber: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
