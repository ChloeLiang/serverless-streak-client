import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SignUp from '../../components/SignUp';
import ERROR from '../../constants/error';

jest.mock('aws-amplify');

it('should render basic component', () => {
  const { container } = render(<SignUp />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should validate username', async () => {
  render(<SignUp />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const button = screen.getByTestId('signUp-submit');

  fireEvent.click(button);
  const requiredError = await screen.findByText(ERROR.REQUIRED_USERNAME);
  expect(requiredError).toBeTruthy();

  fireEvent.change(usernameInput, { target: { value: 'test' } });
  const invalidError = await screen.findByText(ERROR.INVALID_USERNAME);
  expect(invalidError).toBeTruthy();

  fireEvent.change(usernameInput, { target: { value: 'example@gmail.com' } });
  const result = await waitForElementToBeRemoved(() =>
    screen.queryByText(ERROR.INVALID_USERNAME)
  );
  expect(result).toBeTruthy();
});

it('should validate password', async () => {
  render(<SignUp />);
  const button = screen.getByTestId('signUp-submit');

  fireEvent.click(button);
  const requiredError = await screen.findAllByText(ERROR.REQUIRED_PASSWORD);
  expect(requiredError).toHaveLength(2);
});

it('should validate confirm password', async () => {
  render(<SignUp />);
  const button = screen.getByTestId('signUp-submit');
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const username = 'admin@example.com';
  const password = 'Passw0rd!';
  const wrongPassword = 'Password';
  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: wrongPassword } });
  fireEvent.click(button);
  await screen.findByText(ERROR.CONFIRM_PASSWORD);
});
