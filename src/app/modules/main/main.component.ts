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

  booksView() {
    this.router.navigate(['/pregled']);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
