import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../components/Home';

it('should render basic component', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});
