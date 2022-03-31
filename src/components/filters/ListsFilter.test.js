import React from 'react';

import { render, screen } from 'testUtils';
import ListsFilter from './ListsFilter';
import * as listActions from '../../actions/lists';

const mockOnChangeHandler = jest.fn();

describe('ListsFilter', () => {
  beforeEach(() => {
    render(
      <ListsFilter
        actions={listActions}
        defaultValue="hardcover-fiction"
        onChange={mockOnChangeHandler}
      />
    );
  });

  describe('Component was properly rendered', () => {
    it('should render the component', () => {
      expect(screen.getByTestId('lists-filter')).toBeInTheDocument();
    });
  });
});
