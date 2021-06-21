import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, useParams } from '@reach/router';
import styled from 'styled-components/macro';
import Page from 'components/Page';
import Book from 'components/Book';

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

  const [state, setState] = useState('loading');
  const [selected, setSelected] = useState(listName || 'hardcover-fiction');
  const [lists, setLists] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY || '';
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
    )
      .then(resp => resp.json())
      .then(({ results }) => setLists(results));
  }, []);

  useEffect(() => {
    setState('loading');
    actions.getBooks(selected).then(() => {
      setState('done');
    });
  }, [actions, selected]);

  const handleChange = e => {
    const { value } = e.target;
    setSelected(value);
    navigate(`/${value}`, { replace: true });
  };
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
      pageTitle="Discover New Books"
      filters={[
        <select onChange={handleChange} value={selected} key="lists">
          {lists.map(list => (
            <option key={list.list_name_encoded} value={list.list_name_encoded}>
              {list.display_name}
            </option>
          ))}
        </select>,
        Sorter,
      ]}
    >
      {state === 'done' && (
        <Shelf>
          {books
            .sort(({ [sortBy]: a }, { [sortBy]: b }) =>
              a < b ? -1 : a > b ? 1 : 0
            )
            .map(book => (
              <Book
                view={view}
                book={{
                  id: book.primary_isbn13,
                  title: book.title,
                  image_url: book.book_image,
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
