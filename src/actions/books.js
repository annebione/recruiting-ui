export const addBook = book => ({
  type: 'book_added',
  book,
});

export const removeBook = book => ({
  type: 'book_removed',
  book,
});
