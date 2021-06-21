import reducer from './index';

describe('The main reducer', () => {
  const initialState = {
    books: [],
    saved: [],
  };

  it('should load books', () => {
    expect(
      reducer(initialState, {
        type: 'books_loaded',
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

  it('should add a custom book', () => {
    expect(
      reducer(initialState, {
        type: 'book_added',
        book: { title: 'something', author: 'someone' },
      }).saved
    ).toEqual([{ title: 'something', author: 'someone' }]);
  });

  it('should save a book', () => {
    expect(
      reducer(initialState, {
        type: 'book_saved_from_list',
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
      reducer(initialState, { type: 'book_removed', book: { id: 1 } }).saved
    ).toEqual([{ title: 'A solid book', id: 2 }]);
  });
});
