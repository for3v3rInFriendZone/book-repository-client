import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { BooksComponent } from './modules/books/books.component';

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
        path: 'pregled',
        component: BooksComponent
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
