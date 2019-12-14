import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { BookListComponent } from './modules/book-list/book-list.component';
import { BookComponent } from './modules/book/book.component';

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
        path: 'nova',
        component: BookComponent
    },
    {
        path: 'knjiga/:id',
        component: BookComponent
    },
    {
        path: 'pregled',
        component: BookListComponent
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
