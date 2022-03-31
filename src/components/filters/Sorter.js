import React from 'react';
import PropTypes from 'prop-types';

export const Sorter = ({ defaultSorting, onChange }) => {
  const onChangeHandler = e => {
    onChange(e.target.value);
  };

  return (
    <label>
      Sort by&nbsp;
      <select
        onChange={onChangeHandler}
        value={defaultSorting}
        data-testid="sorter"
      >
        <option key="title">title</option>
        <option key="author">author</option>
      </select>
    </label>
  );
};

Sorter.propTypes = {
  defaultSorting: PropTypes.string,
  onChange: PropTypes.func,
};

export default Sorter;
