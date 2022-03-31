import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, useParams } from '@reach/router';
import styled from 'styled-components/macro';
import Page from 'components/Page';
import Book from 'components/Book';
import Sorter from 'components/filters/Sorter';
import { ListsFilter } from 'components/filters/ListsFilter';

import { booksSorter } from 'utils/books-sorter';

const Shelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

export default function Overview({ books, actions, saved }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { listName } = useParams();
  const [, view] = location.search.match(/view=(grid|list)/) || [];
  const [selected, setSelected] = useState(listName || 'hardcover-fiction');
  const [sortBy, setSortBy] = useState('title');
  const sortedBooks = useMemo(() => booksSorter(books, sortBy), [
    books,
    sortBy,
  ]);

  useEffect(() => {
    actions.getBooks(selected);
  }, [actions, selected]);

  const handleChange = e => {
    const { value } = e.target;
    setSelected(e.target.value);
    navigate(`/${value}`, { replace: true });
  };

  return (
    <Page
      pageTitle="Discover New Books"
      filters={[
        <ListsFilter
          actions={actions}
          defaultValue={selected}
          key="lists"
          onChange={handleChange}
        />,
        <Sorter key="sorter" defaultSorting={sortBy} onChange={setSortBy} />,
      ]}
    >
      {sortedBooks && (
        <Shelf>
          {sortedBooks.map(book => (
            <Book
              view={view}
              book={{
                id: book.primary_isbn13,
                title: book.title,
                book_image: book.book_image,
                description: book.description,
                author: book.author,
              }}
              actions={actions}
              key={book.primary_isbn13}
              onSave={() => {
                actions.saveBookFromList(book);
              }}
              onRemove={() =>
                actions.removeBook(
                  saved.find(({ id }) => id === book.primary_isbn13)
                )
              }
              saved={saved.some(({ id }) => id === book.primary_isbn13)}
            />
          ))}
        </Shelf>
      )}
    </Page>
  );
}

Overview.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  books: PropTypes.arrayOf(PropTypes.object),
  saved: PropTypes.arrayOf(PropTypes.object),
};
