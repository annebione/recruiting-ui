import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from 'testUtils';

import Sorter from './Sorter';

const mockOnChangeHandler = jest.fn();

describe('Sorter', () => {
  beforeAll(() => {
    render(<Sorter onChange={mockOnChangeHandler} />);
  });

  describe('user selects a sorting option', () => {
    beforeEach(() => {
      userEvent.selectOptions(screen.getByTestId('sorter'), 'author');
    });

    it('should call onChange function', () => {
      expect(mockOnChangeHandler).toHaveBeenCalled();
    });
  });
});
