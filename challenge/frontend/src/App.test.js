import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders login form', () => {
  render(<App />);
  expect(screen.getByText(/NYC Council Dashboard Login/i)).toBeInTheDocument();
});

test('renders dashboard', () => {
  render(<App />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
