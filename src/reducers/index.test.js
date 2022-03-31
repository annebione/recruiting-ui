import reducer from './index';
import * as types from '../constants/action-types';

describe('The main reducer', () => {
  const initialState = {
    books: [],
    saved: [],
    lists: [],
  };

  it('should load books', () => {
    expect(
      reducer(initialState, {
        type: types.BOOKS_LOADED,
        books: [
          { title: 'foo', author: 'bar' },
          { title: 'something', author: 'someone' },
        ],
      }).books
    ).toEqual([
      { title: 'foo', author: 'bar' },
      { title: 'something', author: 'someone' },
    ]);
  });

  it('should load books lists', () => {
    expect(
      reducer(initialState, {
        type: types.LISTS_LOADED,
        lists: [
          {
            list_name: 'Combined Print and E-Book Fiction',
            list_name_encoded: 'combined-print-and-e-book-fiction',
          },
          {
            list_name: 'Hardcover Fiction',
            list_name_encoded: 'hardcover-fiction',
          },
        ],
      }).lists
    ).toEqual([
      {
        list_name: 'Combined Print and E-Book Fiction',
        list_name_encoded: 'combined-print-and-e-book-fiction',
      },
      {
        list_name: 'Hardcover Fiction',
        list_name_encoded: 'hardcover-fiction',
      },
    ]);
  });

  it('should add a custom book', () => {
    expect(
      reducer(initialState, {
        type: types.BOOK_ADDED,
        book: { title: 'something', author: 'someone' },
      }).saved
    ).toEqual([{ title: 'something', author: 'someone' }]);
  });

  it('should save a book', () => {
    expect(
      reducer(initialState, {
        type: types.BOOK_SAVED_FROM_LIST,
        book: { title: 'something', author: 'someone' },
      }).saved
    ).toEqual([{ title: 'something', author: 'someone' }]);
  });

  it('should remove a book', () => {
    initialState.saved.push(
      { title: 'A decent book', id: 1 },
      { title: 'A solid book', id: 2 }
    );
    expect(
      reducer(initialState, { type: types.BOOK_REMOVED, book: { id: 1 } }).saved
    ).toEqual([{ title: 'A solid book', id: 2 }]);
  });
});
