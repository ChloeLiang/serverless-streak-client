import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../components/Header';

it('should render basic component', () => {
  const { container } = render(
    <Router>
      <Header />
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should display sign up and login button', () => {
  const { queryByText } = render(
    <Router>
      <Header />
    </Router>
  );

  expect(queryByText(/sign up/i)).toBeTruthy();
  expect(queryByText(/login/i)).toBeTruthy();
});
