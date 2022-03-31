import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Page from 'components/Page';
import { SaveButton } from 'components/Buttons';
import BookCover from 'components/BookCover';

import { getBookDetails } from 'utils/get-book-details';

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
  const book = getBookDetails(saved, books, bookId);

  const onSave = () => actions.saveBookFromList(book);
  const onRemove = () => actions.removeBook(book);

  if (!book) {
    return (
      <Page>
        <h2>Book not found!</h2>
      </Page>
    );
  }

  return (
    <StyledPage>
      <div>
        <BookCover imgUrl={book.book_image} alt={book.title} />
        <StyledSaveButton
          onSave={onSave}
          onRemove={onRemove}
          saved={book.isSaved}
        />
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
