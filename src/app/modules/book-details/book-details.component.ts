import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/util/shared.service';
import { Book } from 'src/app/model/book';

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

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.bookDetailsRoute);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}

