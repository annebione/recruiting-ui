import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useNavigate } from '@reach/router';
import { v4 as uuidv4 } from 'uuid';

import Page, { Content } from 'components/Page';

import Icon from 'components/Icon';

const Button = styled.button`
  border: 1px solid #d6216b;
  border-radius: 20px;
  background: #fff;
  color: #d6216b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 150px;
  height: 40px;
`;

const ErrorMessage = styled.div`
  color #d6216b;
margin-bottom: 1em;
font-size: 14px;
margin-top: -0.75em;
`;

const StyledForm = styled.form`
  width: 400px;
  order: 2;
  & > input {
    border-radius: 6px;
    border: 1px solid #c0c6d9;
    width: 100%;
    height: 40px;
    font-size: 14px;
    margin-bottom: 1em;
    padding: 0 16px;
    &[data-error] {
      border-color: #d6216b;
    }
  }
  & > textarea {
    padding: 10px 16px;
    height: auto;
    border-radius: 6px;
    border: 1px solid #c0c6d9;
    width: 100%;
    font-size: 14px;
    margin-bottom: 1em;
    &[data-error] {
      border-color: #d6216b;
    }
  }
`;
const Cover = styled.div`
  width: 240px;
  height: 360px;
  margin: 0 100px 0 0;
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

const FormPage = styled(Page)`
  ${Content} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default function AddBook({ actions }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    author: '',
    description: '',
    image_url: '',
    id: uuidv4(),
  });
  const [errors, setErrors] = useState({});
  const handleChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const validationErrors = {};
    if (values.title.trim().length < 2) {
      validationErrors.title = 'Please provide a title.';
    }
    if (values.author.trim().length < 2) {
      validationErrors.author = 'Please provide an author.';
    }
    if (
      !/^(http(s?):)([\s\w./|-])*\.+(?:jpg|gif|png)+$/.test(values.image_url)
    ) {
      validationErrors.image_url = 'Please provide a cover image.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    actions.addBook(values);
    navigate('/saved');
    return true;
  };

  return (
    <FormPage pageTitle="Add New Book">
      <StyledForm>
        <input
          name="title"
          placeholder="Book Title"
          value={values.title}
          onChange={handleChange}
          data-error={errors.title}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <input
          name="author"
          placeholder="Author Name"
          value={values.author}
          onChange={handleChange}
          data-error={errors.author}
        />
        {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}

        <textarea
          name="description"
          placeholder="Book Description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />

        <input
          name="image_url"
          placeholder="Cover Image URL"
          value={values.image_url}
          onChange={handleChange}
          data-error={errors.image_url}
        />
        {errors.image_url && <ErrorMessage>{errors.image_url}</ErrorMessage>}

        <Button type="button" onClick={handleSubmit}>
          Save
        </Button>
      </StyledForm>
      <Cover>
        {values.image_url ? (
          <img src={values.image_url} alt={values.title} />
        ) : (
          <Icon icon="book-open" />
        )}
      </Cover>
    </FormPage>
  );
}

AddBook.propTypes = { actions: PropTypes.objectOf(PropTypes.func) };
