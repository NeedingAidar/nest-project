import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  async getBooks(): Promise<any> {
    return await this.booksService.getBooks();
  }
}
