import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './model/book.model';


@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // Создание книги
  async create(createBookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  // Получение всех книг
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  // Получение книги по ID
  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  // Обновление книги по ID
  async update(id: string, updateBookDto: any): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  // Удаление книги по ID
  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndRemove(id).exec();
  }
}

