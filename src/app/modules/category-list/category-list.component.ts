import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { Category } from 'src/app/model/category';
import { CategoryService } from '../services/category.service';
import { SharedService } from 'src/app/util/shared.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  componentActive = true;
  isLoading = false;
  categories: Category[];
  routeHeader = 'Преглед категорија';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.routeHeader);
    this.getCategories();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  goToEditCategory(id: string) {
    this.router.navigate(['/kategorija', id]);
  }

  private getCategories() {
    this.isLoading = true;

    this.categoryService.getAll()
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        categories => {
          this.categories = categories
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);;
          this.collectionSize = this.categories.length;

          this.isLoading = false;
        },
        () => this.isLoading = false
      );
  }

}
