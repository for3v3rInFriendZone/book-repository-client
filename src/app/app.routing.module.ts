import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { BookListComponent } from './modules/book-list/book-list.component';
import { BookComponent } from './modules/book/book.component';
import { CategoryComponent } from './modules/category/category.component';
import { CategoryListComponent } from './modules/category-list/category-list.component';
import { BookDetailsComponent } from './modules/book-details/book-details.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/naslovna',
        pathMatch: 'full'
    },
    {
        path: 'naslovna',
        component: MainComponent
    },
    {
        path: 'knjiga/nova',
        component: BookComponent
    },
    {
        path: 'knjiga/:id',
        component: BookDetailsComponent
    },
    {
        path: 'knjiga/:id/izmena',
        component: BookComponent
    },
    {
        path: 'knjige',
        component: BookListComponent
    },
    {
        path: 'kategorija/nova',
        component: CategoryComponent
    },
    {
        path: 'kategorija/:id',
        component: CategoryComponent
    },
    {
        path: 'kategorije',
        component: CategoryListComponent
    },
    {
        path: '**',
        redirectTo: 'naslovna'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
