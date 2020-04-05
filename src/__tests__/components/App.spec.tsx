import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import awsAmplify from 'aws-amplify';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from '../../App';
import ERROR from '../../constants/error';

jest.mock('aws-amplify');

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

it('should render home page', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  expect(screen.queryByText(/Streak/i)).toBeTruthy();
});

it('should show sign up and log in button if user is not authenticated', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  expect(screen.queryByText(/Sign up/i)).toBeTruthy();
  expect(screen.queryByText(/Login/i)).toBeTruthy();
  expect(screen.queryByText(/Logout/i)).toBeFalsy();
});

it('should show logout button if user is authenticated', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  expect(screen.queryByText(/Sign up/i)).toBeFalsy();
  expect(screen.queryByText(/Login/i)).toBeFalsy();
  expect(screen.queryByText(/Logout/i)).toBeTruthy();
});

it('should render login from', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Login/i));
  expect(screen.queryByText(/Username/i)).toBeTruthy();
  expect(screen.queryByText(/Password/i)).toBeTruthy();
});

it('should log user in', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.signIn.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Login/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('login-submit'));
  await waitForElementToBeRemoved(() => screen.queryByText(/Login/i));
  expect(screen.queryByText(/Logout/i)).toBeTruthy();
});

it('should stay on login page if login failed', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.signIn.mockImplementationOnce(() => {
    return Promise.reject({ message: ERROR.INCORRECT_LOGIN });
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Login/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const username = 'admin@example.com';
  const password = 'wrong-password';
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('login-submit'));
  await screen.findByText(ERROR.INCORRECT_LOGIN);
  expect(screen.queryByText(/Logout/i)).toBeFalsy();
  expect(screen.queryByText(/Sign up/i)).toBeTruthy();
  expect(screen.queryByText(/Login/i)).toBeTruthy();
});

it('should log user out', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  awsAmplify.Auth.signOut.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Logout/i));
  await waitForElementToBeRemoved(() => screen.queryByText(/Logout/i));
  expect(screen.queryByText(/Sign up/i)).toBeTruthy();
  expect(screen.queryByText(/Login/i)).toBeTruthy();
});

it('should redirect user to login page after logout', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  awsAmplify.Auth.signOut.mockImplementationOnce(() => {
    return Promise.resolve('success');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Logout/i));
  await waitForElementToBeRemoved(() => screen.queryByText(/Logout/i));
  expect(screen.queryByText(/Username/i)).toBeTruthy();
  expect(screen.queryByText(/Password/i)).toBeTruthy();
});
