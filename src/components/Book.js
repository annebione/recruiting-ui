import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';

import { displayTypes } from 'constants/display-types';

import { SaveButton } from './Buttons';
import BookCover from './BookCover';

const Anchor = styled(Link)`
  text-decoration: none;
  font: inherit;
  color: inherit;
`;

const Details = styled.section`
  flex: 1;
`;

const Wrapper = styled.article`
  font-family: Palatino, serif;
  display: flex;
  justify-content: flex-start;
  width: 270px;
  padding: 50px 10px;

  ${({ view }) => {
    if (view === displayTypes.LIST) {
      return `
        align-items: flex-start;
        width: 100%;
        padding: 10px;
        ${BookCover} {
            margin-right: 78px;
        }
      `;
    }
    return `
      &&, ${Details} {
        display: flex;
        align-items: center;
        flex-direction: column;
          text-align: center;
      }
  `;
  }}
`;

const Title = styled.h3`
  color: #242a35;
  font-family: Palatino, serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  margin: 0 0 8px 0;
  text-transform: capitalize;
`;

const Author = styled.p`
  font-family: Palatino, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  margin: 0 0 8px 0;
  color: #717883;
`;

const Description = styled.p`
  color: #242a35;
  font-family: Palatino, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin: 1em 0 2em 0;
`;

export default function Book({ book, onSave, onRemove, saved, view }) {
  const { id, book_image: bookImage, title, author, description } = book;

  return (
    <Wrapper key={id} view={view}>
      <Anchor to={`/books/${id}`}>
        <BookCover imgUrl={bookImage} alt={title} size="sm" />
      </Anchor>
      <Details>
        <Title>
          <Anchor to={`/books/${id}`}>{title.toLowerCase()}</Anchor>
        </Title>
        <Author>{author}</Author>
        {view === displayTypes.LIST && <Description>{description}</Description>}
        <SaveButton onSave={onSave} onRemove={onRemove} saved={saved} />
      </Details>
    </Wrapper>
  );
}

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string),
  saved: PropTypes.bool,
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
  view: PropTypes.string,
};
