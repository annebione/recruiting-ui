import { BOOK_ADDED, BOOK_REMOVED } from 'constants/action-types';

export const addBook = book => ({
  type: BOOK_ADDED,
  book,
});

export const removeBook = book => ({
  type: BOOK_REMOVED,
  book,
});
