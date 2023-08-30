import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';
import { BookSchema } from './model/book.model';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ],
      providers: [
        {
            provide: getModelToken('Book'),
            useValue: BookSchema,
        }
      ]
    })
    .overrideProvider(BooksService)
    .useValue({
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({ id: 'testId', title: 'Test Book' }),
      create: jest.fn().mockImplementation(book => Promise.resolve({ id: 'testId', ...book })),
      update: jest.fn().mockImplementation((id, book) => Promise.resolve({ id, ...book })),
      remove: jest.fn().mockImplementation(id => Promise.resolve({ id })),
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([]);
  });

  it('/books/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/testId')
      .expect(200)
      .expect({ id: 'testId', title: 'Test Book' });
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: 'Test Book' })
      .expect(201)
      .expect({ id: 'testId', title: 'Test Book' });
  });

  it('/books/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/books/testId')
      .send({ title: 'Updated Book' })
      .expect(200)
      .expect({ id: 'testId', title: 'Updated Book' });
  });

  it('/books/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/books/testId')
      .expect(200)
      .expect({ id: 'testId' });
  });

  afterAll(async () => {
    await app.close();
  });
  
});
