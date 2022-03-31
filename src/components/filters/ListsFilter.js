import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ListsFilter = ({ actions, defaultValue, onChange }) => {
  useEffect(() => actions.getCategoryLists(), [actions]);

  const lists = useSelector(state => state.lists);

  const onChangeHandler = e => {
    onChange(e);
  };

  return (
    <select
      onChange={onChangeHandler}
      value={defaultValue}
      key="lists"
      data-testid="lists-filter"
    >
      {lists &&
        lists.map(list => (
          <option key={list.list_name_encoded} value={list.list_name_encoded}>
            {list.display_name}
          </option>
        ))}
    </select>
  );
};

ListsFilter.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default ListsFilter;
