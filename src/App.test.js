import React from 'react';
import { render, screen } from './testUtils';
import App from './App';

it("doesn't blow up", () => {
  render(<App />);
  expect(screen.getByText(/bookcues/i)).toBeInTheDocument();
});
