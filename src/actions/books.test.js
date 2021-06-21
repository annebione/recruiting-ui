import { addBook, removeBook } from './books';

describe('addBook()', () => {
  it('should create an add book action', () => {
    expect(addBook({ title: 'A book', author: 'Someone' })).toEqual({
      type: 'book_added',
      book: { title: 'A book', author: 'Someone' },
    });
  });
});

describe('removeBook()', () => {
  it('should create a remove book action', () => {
    expect(removeBook({ title: 'A book', author: 'Someone' })).toEqual({
      type: 'book_removed',
      book: { title: 'A book', author: 'Someone' },
    });
  });
});
