import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import awsAmplify from 'aws-amplify';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from '../../App';
import ERROR from '../../constants/error';

jest.mock('aws-amplify');
jest.mock('../../components/Home.tsx', () => {
  return () => <p>Home Page</p>;
});

afterEach(jest.clearAllMocks);

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
  expect(screen.queryByText(/Home Page/i)).toBeTruthy();
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

it('should render sign up form', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Sign Up/i));
  expect(screen.queryByText(/Username/i)).toBeTruthy();
  expect(screen.queryAllByText(/Password/i)).toHaveLength(2);
});

it('should sign up, confirm code and redirect to home page', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.confirmSignUp.mockImplementationOnce(() => {
    return Promise.resolve('success');
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
  fireEvent.click(screen.getByText(/Sign Up/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';
  const confirmationCode = '111111';

  // Sign up and show confirmation code page
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('signUp-submit'));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Confirm Password/i)
  );
  expect(awsAmplify.Auth.signUp).toHaveBeenCalledTimes(1);
  expect(awsAmplify.Auth.signUp).toHaveBeenCalledWith({ username, password });
  expect(screen.queryByText(/Confirmation Code/i)).toBeTruthy();

  // Confirm code and redirect to home page
  const codeInput = screen.getByLabelText(/Confirmation Code/i);
  fireEvent.change(codeInput, { target: { value: confirmationCode } });
  fireEvent.click(screen.getByTestId('signUp-verify'));
  await screen.findByText(/Logout/i);
  expect(awsAmplify.Auth.confirmSignUp).toHaveBeenCalledTimes(1);
  expect(awsAmplify.Auth.confirmSignUp).toHaveBeenCalledWith(
    username,
    confirmationCode
  );
});

it('should stay on sign up page if sign up failed', async () => {
  const signUpError = 'Error signing up';
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.signUp.mockImplementationOnce(() => {
    return Promise.reject({ message: signUpError });
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Sign Up/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('signUp-submit'));
  await screen.findByText(signUpError);
  expect(screen.queryByText(/Logout/i)).toBeFalsy();
  expect(screen.queryByText(/Sign up/i)).toBeTruthy();
  expect(screen.queryByText(/Login/i)).toBeTruthy();
});

it('should show verify page if user exists but is not verified', async () => {
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.signUp.mockImplementationOnce(() => {
    return Promise.reject({ code: 'UsernameExistsException' });
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Sign Up/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('signUp-submit'));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Confirm Password/i)
  );
  expect(awsAmplify.Auth.signUp).toHaveBeenCalledTimes(1);
  expect(awsAmplify.Auth.signUp).toHaveBeenCalledWith({ username, password });
  expect(awsAmplify.Auth.resendSignUp).toHaveBeenCalledTimes(1);
  expect(awsAmplify.Auth.resendSignUp).toHaveBeenCalledWith(username);
  expect(screen.queryByText(/Confirmation Code/i)).toBeTruthy();
});

it('should show verification error', async () => {
  const verificationError = 'error';
  awsAmplify.Auth.currentSession.mockImplementationOnce(() => {
    return Promise.reject('No current user');
  });
  awsAmplify.Auth.confirmSignUp.mockImplementationOnce(() => {
    return Promise.reject({ message: verificationError });
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
  fireEvent.click(screen.getByText(/Sign Up/i));
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';
  const confirmationCode = '111111';

  // Sign up and show confirmation code page
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });
  fireEvent.click(screen.getByTestId('signUp-submit'));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Confirm Password/i)
  );

  const codeInput = screen.getByLabelText(/Confirmation Code/i);
  fireEvent.change(codeInput, { target: { value: confirmationCode } });
  fireEvent.click(screen.getByTestId('signUp-verify'));
  const error = await screen.findByText(verificationError);
  expect(error).toBeTruthy();
});
