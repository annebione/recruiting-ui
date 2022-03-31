export const getBookDetails = (saved, books, bookId) => {
  let book = saved.find(({ id }) => id === bookId);
  const isSaved = !!book;

  if (books) {
    const fullBook = books.find(({ primary_isbn13: id }) => id === bookId);

    if (fullBook) {
      book = fullBook;
    }
  }

  if (!book) {
    return null;
  }

  return { ...book, isSaved };
};
