import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  styleUrls: ['./spinner.component.scss'],
  template: `
  <div *ngIf="showSpinner" class="loading-page">
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only">{{message}}...</span>
    </div>
    <div class="text-info">
      {{message}}...
    </div>
  </div>
  `
})
export class SpinnerComponent {
  @Input() showSpinner = false;
  @Input() message: string;
}
