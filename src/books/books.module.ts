import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.model';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService]
  
})
export class BooksModule {}
