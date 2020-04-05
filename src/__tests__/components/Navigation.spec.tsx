import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, screen } from '@testing-library/react';
import Navigation from '../../components/Navigation';
import AuthContext from '../../contexts/AuthContext';

jest.mock('aws-amplify');

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(
    <Router>
      <AuthContext.Provider value={[false, jest.fn()]}>
        <Navigation />
      </AuthContext.Provider>
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should show sign up and login button if user is not authenticated', () => {
  render(
    <Router>
      <AuthContext.Provider value={[false, jest.fn()]}>
        <Navigation />
      </AuthContext.Provider>
    </Router>
  );
  expect(screen.queryByText(/Sign up/i)).toBeTruthy();
  expect(screen.queryByText(/Login/i)).toBeTruthy();
  expect(screen.queryByText(/Logout/i)).toBeFalsy();
});

it('should show logout button if user is authenticated', () => {
  render(
    <Router>
      <AuthContext.Provider value={[true, jest.fn()]}>
        <Navigation />
      </AuthContext.Provider>
    </Router>
  );
  expect(screen.queryByText(/Sign up/i)).toBeFalsy();
  expect(screen.queryByText(/Login/i)).toBeFalsy();
  expect(screen.queryByText(/Logout/i)).toBeTruthy();
});
