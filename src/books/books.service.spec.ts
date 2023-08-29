import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let mockModel;

  beforeEach(async () => {
    
    mockModel = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      }),
      save: jest.fn().mockResolvedValue({ title: 'Test Book' }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ title: 'Test Book' }),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ title: 'Updated Book' }),
      }),
      findByIdAndRemove: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ title: 'Test Book' }),
      }),
    };
    

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return an array of books', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(mockModel.find).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const createBookDto = { title: 'Test Book' };
    expect(await service.create(createBookDto)).toEqual(createBookDto);
    expect(mockModel.save).toHaveBeenCalled();
  });

  it('should return a book by ID', async () => {
    const bookId = 'testId';
    const book = { title: 'Test Book' };
    expect(await service.findOne(bookId)).toEqual(book);
    expect(mockModel.findById).toHaveBeenCalledWith(bookId);
  });

  it('should update a book by ID', async () => {
    const bookId = 'testId';
    const updateBookDto = { title: 'Updated Book' };
    const updatedBook = { title: 'Updated Book' };
    expect(await service.update(bookId, updateBookDto)).toEqual(updatedBook);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(bookId, updateBookDto, { new: true });
  });

  it('should remove a book by ID', async () => {
    const bookId = 'testId';
    const book = { title: 'Test Book' };
    expect(await service.remove(bookId)).toEqual(book);
    expect(mockModel.findByIdAndRemove).toHaveBeenCalledWith(bookId);
  });  

});
