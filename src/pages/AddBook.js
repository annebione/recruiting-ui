import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useNavigate } from '@reach/router';
import { v4 as uuidv4 } from 'uuid';

import Page, { Content } from 'components/Page';
import TextInput from 'components/forms/TextInput';
import BookCover from 'components/BookCover';

import { validateFormFields } from 'utils/validate-form-fields';

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

const StyledForm = styled.form`
  width: 400px;
  order: 2;
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
    book_image: '',
    id: uuidv4(),
  });
  const [formState, setFormState] = useState({
    errors: {},
    isValid: false,
  });
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const handleChange = e => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setFormState(
      validateFormFields({
        title: values.title,
        author: values.author,
        book_image: values.book_image,
      })
    );
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (!formState.isValid) {
        return false;
      }
      actions.addBook(values);
      navigate('/saved');
      return true;
    }
    return formState;
  });

  return (
    <FormPage pageTitle="Add New Book">
      <StyledForm>
        <TextInput
          name="title"
          placeholder="Book Title"
          value={values.title}
          onChange={handleChange}
          error={formState.errors.title}
        />
        <TextInput
          name="author"
          placeholder="Author Name"
          value={values.author}
          onChange={handleChange}
          error={formState.errors.author}
        />
        <textarea
          name="description"
          placeholder="Book Description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />

        <TextInput
          name="book_image"
          placeholder="Cover Image URL"
          value={values.book_image}
          onChange={handleChange}
          error={formState.errors.book_image}
        />

        <Button type="button" onClick={handleSubmit}>
          Save
        </Button>
      </StyledForm>
      <BookCover imgUrl={values.book_image} alt={values.title} />
    </FormPage>
  );
}

AddBook.propTypes = { actions: PropTypes.objectOf(PropTypes.func) };
