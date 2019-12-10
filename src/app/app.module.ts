import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainComponent } from './modules/main/main.component';
import { BooksComponent } from './modules/books/books.component';
import { BookService } from './modules/services/book.service';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { SharedService } from './util/shared.service';
import { NewBookComponent } from './modules/new-book/new-book.component';
import { CategoryService } from './modules/services/category.service';

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
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    AppRoutingModule
  ],
  providers: [BookService, SharedService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
