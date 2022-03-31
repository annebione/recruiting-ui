import {
  BOOKS_LOADED,
  BOOKS_LOAD_ERROR,
  LISTS_LOADED,
  LISTS_LOAD_ERROR,
  BOOK_SAVED_FROM_LIST,
} from 'constants/action-types';

const API_KEY = process.env.REACT_APP_API_KEY || '';

export const getBooks = list => dispatch =>
  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/${list}.json?api-key=${API_KEY}`
  )
    .then(resp => resp.json())
    .then(({ results }) => {
      dispatch({
        type: BOOKS_LOADED,
        books: results.books,
      });
    })
    .catch(error =>
      dispatch({
        type: BOOKS_LOAD_ERROR,
        error,
      })
    );

export const getCategoryLists = () => {
  return dispatch => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
    )
      .then(resp => resp.json())
      .then(({ results }) => {
        dispatch({
          type: LISTS_LOADED,
          lists: results,
        });
      })
      .catch(error =>
        dispatch({
          type: LISTS_LOAD_ERROR,
          error,
        })
      );
  };
};

export const saveBookFromList = book => dispatch =>
  dispatch({
    type: BOOK_SAVED_FROM_LIST,
    book: {
      id: book.primary_isbn13,
      title: book.title,
      author: book.author,
      book_image: book.book_image,
      description: book.description,
    },
  });
