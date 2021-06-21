import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useNavigate, useLocation } from '@reach/router';

import { Button } from 'components/Buttons';
import Icon from 'components/Icon';
import Page from 'components/Page';
import Book from 'components/Book';

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

  const Sorter = (
    <label key="sorter">
      Sort by&nbsp;
      <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
        <option>title</option>
        <option>author</option>
      </select>
    </label>
  );
  return (
    <Page
      pageTitle="Your Saved Books"
      filters={[
        <Button onClick={() => navigate('/books/new')} key="add-new">
          <Icon icon="plus" /> Add new book
        </Button>,
        Sorter,
      ]}
    >
      <Shelf>
        {books
          .sort(({ [sortBy]: a }, { [sortBy]: b }) =>
            a < b ? -1 : a > b ? 1 : 0
          )
          .map(book => (
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
                  saved.find(
                    ({ id }) => id === (book.primary_isbn13 || book.id)
                  )
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
