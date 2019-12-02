import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainComponent } from './modules/main/main.component';
import { BooksComponent } from './modules/books/books.component';
import { BookService } from './modules/services/book.service';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { SharedService } from './util/shared.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewBookComponent } from './modules/new-book/new-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    NewBookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [BookService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
