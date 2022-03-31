import { getBookDetails } from './get-book-details';

const savedBooks = [
  {
    id: 10,
    title: 'Saved title',
    author: 'Saved author',
    book_image: 'https://covers.openlibrary.org/b/id/8010154-L.jpg',
  },
];

const fullBooks = [
  {
    primary_isbn13: 11,
    title: 'Fullbook',
    author: 'Fullbook author',
    book_image: 'https://covers.openlibrary.org/b/id/8010154-L.jpg',
  },
];

describe('getBookDetails function', () => {
  it('should return a full book', () => {
    const bookId = 11;
    const book = getBookDetails(savedBooks, fullBooks, bookId);

    expect(book.primary_isbn13).toStrictEqual(11);
    expect(book.isSaved).toStrictEqual(false);
  });

  it('should return a saved book', () => {
    const bookId = 10;
    const book = getBookDetails(savedBooks, fullBooks, bookId);

    expect(book.id).toStrictEqual(10);
    expect(book.isSaved).toStrictEqual(true);
  });

  it('should return null', () => {
    const bookId = 12;
    const book = getBookDetails(savedBooks, fullBooks, bookId);

    expect(book).toStrictEqual(null);
  });
});
