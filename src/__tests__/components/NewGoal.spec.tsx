import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import NewGoal from '../../components/NewGoal';

afterEach(cleanup);
afterEach(jest.clearAllMocks);

it('should render basic component', () => {
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
  const { container } = render(
    <MemoryRouter>
      <NewGoal />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
