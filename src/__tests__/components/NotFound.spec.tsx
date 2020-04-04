import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../../components/NotFound';

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(<NotFound />);
  expect(container.firstChild).toMatchSnapshot();
});
