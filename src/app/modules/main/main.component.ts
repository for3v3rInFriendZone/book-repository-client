import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  componentActive = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  newBookPage() {
    this.router.navigate(['/knjiga/nova']);
  }

  viewBooksPage() {
    this.router.navigate(['/knjige']);
  }

  newCategoryPage() {
    this.router.navigate(['/kategorija/nova']);
  }

  viewCategoriesPage() {
    this.router.navigate(['/kategorije']);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
