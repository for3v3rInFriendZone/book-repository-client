import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsComponent {

  constructor(
    private toastService: ToastService
  ) { }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
