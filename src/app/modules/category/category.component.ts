import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  componentActive = true;
  newCategoryRoute = 'Нова категорија';
  editCategoryRoute = 'Измена категорије';
  categoryForm: FormGroup;
  category = {} as Category;
  categoryId: string;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.determineTheRoute();
  }

  determineTheRoute() {
    this.activatedRoute.params
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        params => {
          this.categoryId = params['id'];
          if (this.categoryId) {
            this.sharedService.sendMessage(this.editCategoryRoute);
            this.getCategoryById(this.categoryId);
          } else {
            this.sharedService.sendMessage(this.newCategoryRoute);
            this.createForm();
          }
        }
      );
  }

  submittedCategory() {
    if (this.categoryForm.invalid) {
      console.log('Invalid form!');
    }

    if (this.category.id) {
      this.updateCategory(this.category.id);
    } else {
      this.saveCategory();
    }
  }

  private updateCategory(id: string) {
    this.categoryService.update(id, this.categoryForm.value)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        updatedCategory => {
          console.log(updatedCategory);
        },
        err => console.log(err)
      );
  }

  private saveCategory() {
    this.categoryService.save(this.categoryForm.value)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        savedCategory => {
          console.log(savedCategory);
        },
        err => console.log(err)
      );
  }

  clearForm() {
    this.categoryForm.reset();
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  private createForm() {
    this.categoryForm = this.fb.group({
      name: new FormControl(this.category.name)
    });
  }

  private getCategoryById(categoryId: string) {
    this.categoryService.getById(categoryId)
      .pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(
        category => {
          this.category = category;
          this.createForm();
        }
      );
  }
}
