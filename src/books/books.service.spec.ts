import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book, BookSchema } from './model/book.model'; 
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: BookSchema,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  // Ваши тесты здесь
});
