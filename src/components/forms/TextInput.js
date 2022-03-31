import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
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
`;

const ErrorMessage = styled.div`
  color: #d6216b;
  margin-bottom: 1em;
  font-size: 14px;
  margin-top: -0.75em;
`;

export const TextInput = ({
  name,
  value,
  placeholder,
  error,
  onChange,
  ...props
}) => (
  <>
    <Input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data-error={error}
      {...props}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextInput;
