import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category } from 'src/app/model/category';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	categoryUrl = '/category';

	constructor(private http: HttpClient) { }

	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(`${environment.url}${this.categoryUrl}`);
	}
}
