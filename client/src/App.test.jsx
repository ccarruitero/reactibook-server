import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Login/);
  expect(title).toBeInTheDocument();
  const linkElement = getByText(/Sign up here/i);
  expect(linkElement).toBeInTheDocument();
});
