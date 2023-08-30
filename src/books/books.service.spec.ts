import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book } from './model/book.model';

const mockBook = {
  title: 'Test Book',
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const booksArray = [
    {
      title: 'Test Book',
    },
    {
      title: 'Another Test Book',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.findAll();
    expect(books).toEqual(booksArray);
  });

  // test to find one book
  it('should return one book', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const book = await service.findOne('123');
    expect(book).toEqual(mockBook);
  });

  it('should create a book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Test Book',
      } as any),
    );
    const newBook = await service.create({
      title: 'Test Book',
    });
    expect(newBook).toEqual(mockBook);
  });

  // test to update a book
  it('should update a book', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const updatedBook = await service.update('123', {
      title: 'Test Book',
    });
    expect(updatedBook).toEqual(mockBook);
  });

  // test to delete a book
  it('should delete a book', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const deletedBook = await service.remove('123');
    expect(deletedBook).toEqual(mockBook);
  });
});
