import * as types from '../constants/action-types';

export const initialState = {
  books: [],
  lists: [],
  saved: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOOKS_LOADED:
      return { ...state, books: action.books };
    case types.BOOKS_LOAD_ERROR:
      return { ...state, error: action.error };
    case types.LISTS_LOADED:
      return { ...state, lists: action.lists };
    case types.LISTS_LOAD_ERROR:
      return { ...state, error: action.error };
    case types.BOOK_ADDED:
      return {
        ...state,
        saved: [...state.saved, action.book],
      };
    case types.BOOK_SAVED_FROM_LIST:
      return {
        ...state,
        saved: [...state.saved, action.book],
      };
    case types.BOOK_REMOVED: {
      const indexToRemove = state.saved.findIndex(
        ({ id }) => id === action.book.id
      );
      state.saved.splice(indexToRemove, 1);
      return state;
    }

    default:
      return state;
  }
}
