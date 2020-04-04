import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

afterEach(cleanup);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

it('should render home page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.queryByText(/Streak/i)).toBeTruthy();
});

it('should render login from', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText(/Login/i));
  expect(screen.queryByText(/Username/i)).toBeTruthy();
  expect(screen.queryByText(/Password/i)).toBeTruthy();
});
