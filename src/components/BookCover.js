import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';

const Cover = styled.div`
  width: 240px;
  height: 360px;
  margin: 0 100px 10px 0;
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
  ${({ size }) => {
    if (size === 'sm') {
      return `
      width: 150px;
      height: 220px;
      margin: 0 0 10px 0;
      justify-content: flex-start;
      flex-direction: column;
      & > img {
        max-height: 240px;
      }
      & > ${Icon} {
          margin-top: 90px
      };`;
    }
    return ``;
  }}

  ${Icon} {
    font-size: 40px;
    color: #7e89a9;
  }
`;

export const BookCover = ({ imgUrl, alt, size = 'lg', ...props }) => (
  <>
    <Cover size={size}>
      {imgUrl ? (
        <img src={imgUrl} alt={alt} {...props} />
      ) : (
        <Icon icon="book-open" />
      )}
    </Cover>
  </>
);

BookCover.propTypes = {
  imgUrl: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default BookCover;
