import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../../components/Home';

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});
