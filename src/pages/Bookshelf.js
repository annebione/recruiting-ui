import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useNavigate, useLocation } from '@reach/router';

import { Button } from 'components/Buttons';
import Icon from 'components/Icon';
import Page from 'components/Page';
import Book from 'components/Book';
import Sorter from 'components/filters/Sorter';

import { booksSorter } from 'utils/books-sorter';

const Shelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 1080px;
  margin: 0 auto;
`;

export default function Bookshelf({ books, actions, saved }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, view] = location.search.match(/view=(grid|list)/) || [];
  const [sortBy, setSortBy] = useState('title');
  const sortedBooks = useMemo(() => booksSorter(books, sortBy), [
    books,
    sortBy,
  ]);

  return (
    <Page
      pageTitle="Your Saved Books"
      filters={[
        <Button onClick={() => navigate('/books/new')} key="add-new">
          <Icon icon="plus" /> Add new book
        </Button>,
        <Sorter defaultSorting={sortBy} onChange={setSortBy} />,
      ]}
    >
      <Shelf>
        {sortedBooks.map(book => (
          <Book
            view={view}
            book={book}
            actions={actions}
            key={book.primary_isbn13 || book.id}
            onSave={() => {
              actions.addBook(book);
            }}
            onRemove={() =>
              actions.removeBook(
                saved.find(({ id }) => id === (book.primary_isbn13 || book.id))
              )
            }
            saved={saved.some(
              ({ id }) => id === (book.primary_isbn13 || book.id)
            )}
          />
        ))}
      </Shelf>
    </Page>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.objectOf(PropTypes.func),
  saved: PropTypes.arrayOf(PropTypes.object),
};
