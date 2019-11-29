import { Category } from './category';

export interface Book {
    id: string;
    title: string;
    authors: string[];
    publisher: string;
    publishedYear: number;
    publication: string;
    numberOfPages: number;
    publicationLanguage: string;
    form: string;
    keepingPlace: string;
    inventoryNumber: number;
    categories: Category[];
}