const API_KEY = process.env.REACT_APP_API_KEY || '';

export const getBooks = list => dispatch =>
  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/${list}.json?api-key=${API_KEY}`
  )
    .then(resp => resp.json())
    .then(({ results }) => {
      dispatch({
        type: 'books_loaded',
        books: results.books,
      });
    });

export const saveBookFromList = book => dispatch => {
  const newBook = {
    id: book.primary_isbn13,
    title: book.title,
    author: book.author,
    image_url: book.book_image,
    description: book.description,
  };
  dispatch({ type: 'book_saved_from_list', book: newBook });
};
