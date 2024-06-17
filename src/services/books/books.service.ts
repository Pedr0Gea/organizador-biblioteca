import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/dto/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BookRepository } from 'src/mongo/repository/book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();
    if (!allBooks.length)
      throw new BadRequestException('here are no books registered yet.');
    return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      const existBook = await this.bookRepository.getBookById(bookID);

      if (!existBook) throw new BadRequestException('There are no results');

      return existBook;
    } catch (error) {
      throw new BadRequestException('There no results.');
    }
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]>{
    const splitedAuthorName = authorName.split(' ')
    const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);

    if(!foundBooks.length)
      throw new BadRequestException('No results for this author.')
    return foundBooks;
  }

  async getBookByName(bookName: string): Promise<Book[]>{
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if(!foundBooks.length)
      throw new BadRequestException('No results for this name.')
    return foundBooks;
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    const existBook = await this.bookRepository.getBookById(bookID);

    if (!existBook)
      throw new BadRequestException('There are no results with this ID.');

    const updatedBook = await this.bookRepository.updateBookById(bookID, newBook);
    if (!updatedBook)
      throw new BadRequestException('Error in update');

    return updatedBook;
  }

  async deleteBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.deleteBookById(bookID);
    } catch (error) {
      throw new BadRequestException('This book does not exists.');
    }
  }
}
