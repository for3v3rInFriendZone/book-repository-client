import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { takeWhile } from 'rxjs/internal/operators/takeWhile';

import { SharedService } from 'src/app/util/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  componentActive = true;
  nameOfRoute: string;

  constructor(
    private sharedService: SharedService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.sharedService.getMessage().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      route => this.nameOfRoute = route
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  goBack() {
    this.sharedService.sendMessage('');
    this.router.navigate(['/naslovna']);
  }
}
