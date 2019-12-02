import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/util/shared.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  routeHeader = 'Унос књиге';

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.sendMessage(this.routeHeader);
  }

}
