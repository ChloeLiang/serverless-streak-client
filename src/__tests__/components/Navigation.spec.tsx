import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import Navigation from '../../components/Navigation';

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(
    <Router>
      <Navigation />
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot();
});
