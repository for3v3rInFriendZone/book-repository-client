import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentUrlSubject = new Subject<string>();

  sendMessage(message: string) {
    this.currentUrlSubject.next(message);
  }

  getMessage(): Observable<string> {
    return this.currentUrlSubject.asObservable();
  }
}
