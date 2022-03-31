import { addBook, removeBook } from './books';
import { BOOK_ADDED, BOOK_REMOVED } from '../constants/action-types';

describe('addBook()', () => {
  it('should create an add book action', () => {
    expect(addBook({ title: 'A book', author: 'Someone' })).toEqual({
      type: BOOK_ADDED,
      book: { title: 'A book', author: 'Someone' },
    });
  });
});

describe('removeBook()', () => {
  it('should create a remove book action', () => {
    expect(removeBook({ title: 'A book', author: 'Someone' })).toEqual({
      type: BOOK_REMOVED,
      book: { title: 'A book', author: 'Someone' },
    });
  });
});
