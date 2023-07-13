import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getBooks(): any {
    const books = ['Преступление и наказание', 'Война и мир'];
    return books;
  }
}
