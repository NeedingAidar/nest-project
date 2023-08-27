import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.model';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
})
export class BooksModule {}
