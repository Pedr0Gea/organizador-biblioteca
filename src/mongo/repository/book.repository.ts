import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../interfaces/book.interface';
import { BookDTO } from 'src/dto/books.dto';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {}

  async saveBook(newBook: BookDTO): Promise<Book> {
    const savedBook = new this.bookModel(newBook);
    return await savedBook.save();
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel.find({}, { __v: false }).exec();
  }

  async getBookById(bookID: string): Promise<Book> {
    return await this.bookModel.findById(bookID, { __v: false }).exec();
  }

  async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
    return await this.bookModel.find({
      $or: [
        { 'author.name': { $in: authorName } },
        { 'author.surname': { $in: authorName } },
      ],
    });
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    return await this.bookModel.find(
      {
        name: { '$regex': bookName, '$options' : 'i' },
      },
      { __v: false },
    );
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    return await this.bookModel
      .findByIdAndUpdate(bookID, newBook, { new: true })
      .exec();
  }

  async deleteBookById(bookId: string): Promise<Book> {
    return await this.bookModel.findOneAndDelete({ _id: bookId });
  }
}
