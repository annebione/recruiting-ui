import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Page from 'components/Page';
import Icon from 'components/Icon';
import { SaveButton } from 'components/Buttons';

const Cover = styled.div`
  width: 240px;
  height: 360px;
  margin: 0 100px 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 1;
  flex-direction: column;
  background-color: #e7ecf3;
  & > img {
    max-width: 100%;
    display: block;
  }
  ${Icon} {
    font-size: 40px;
    color: #7e89a9;
  }
`;

const Author = styled.p`
  font-size: 18px;
  color: #717883;
`;

const StyledPage = styled(Page)`
  h1,
  h2 {
    margin-bottom: 8px;
  }

  h1 {
    text-transform: capitalize;
  }

  p {
    margin-top: 0;
    color: #69707b;
  }

  & > div:nth-of-type(2) > div:first-child {
    float: left;
  }
`;

const Detail = styled.div`
  margin-bottom: 6px;
  color: #69707b;

  strong {
    color: black;
  }
`;

const StyledSaveButton = styled(SaveButton)`
  margin-left: ${({ saved }) => (saved ? '71.25px' : '45px')};
  margin-top: ${({ saved }) => (saved ? '28.5px' : '0')};
`;

export default function BookDetails({ books, bookId, actions, saved }) {
  let book = saved.find(({ id }) => id === bookId);
  const isSaved = !!book;

  if (books) {
    const fullBook = books.find(({ primary_isbn13: id }) => id === bookId);

    if (!book && fullBook) {
      book = fullBook;
    } else if (fullBook) {
      book = { ...book, ...fullBook };
    }
  }

  if (!book) {
    return (
      <Page>
        <h2>Book not found!</h2>
      </Page>
    );
  }

  const coverImageURL = book.book_image || book.image_url;
  const onSave = () => actions.saveBookFromList(book);
  const onRemove = () => actions.removeBook(book);

  return (
    <StyledPage>
      <div>
        <Cover>
          {coverImageURL ? (
            <img src={coverImageURL} alt={book.title} />
          ) : (
            <Icon icon="book-open" />
          )}
        </Cover>
        <StyledSaveButton onSave={onSave} onRemove={onRemove} saved={isSaved} />
      </div>
      <h1>{book.title.toLowerCase()}</h1>
      <Author>{book.author}</Author>
      <h2>Description</h2>
      <p>{book.description}</p>
      <h2>Details</h2>
      {book.publisher && (
        <Detail>
          <strong>Publisher:&nbsp;</strong>
          {book.publisher}
        </Detail>
      )}
      {book.primary_isbn13 && (
        <Detail>
          <strong>ISBN13:&nbsp;</strong>
          {book.primary_isbn13}
        </Detail>
      )}
      {book.rank && (
        <Detail>
          <strong>Best Sellers Rank:&nbsp;</strong>
          {book.rank}
        </Detail>
      )}
      {book.weeks_on_list && (
        <Detail>
          <strong>Weeks on Best Sellers List:&nbsp;</strong>
          {book.weeks_on_list}
        </Detail>
      )}
    </StyledPage>
  );
}

BookDetails.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  bookId: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  saved: PropTypes.arrayOf(PropTypes.object),
};
