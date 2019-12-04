import { Component, OnInit } from '@angular/core';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { CategoryService } from '../services/category.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  componentActive = true;
  routeHeader = 'Унос књиге';
  categories: Category[];

  constructor(
    private sharedService: SharedService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
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

}
