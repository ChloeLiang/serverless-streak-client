import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Login from '../../components/Login';
import ERROR from '../../constants/error';

afterEach(cleanup);

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
  const { container } = render(<Login />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should validate username', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const button = screen.getByRole('button');

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
  render(<Login />);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByRole('button');

  fireEvent.click(button);
  const requiredError = await screen.findByText(ERROR.REQUIRED_PASSWORD);
  expect(requiredError).toBeTruthy();

  fireEvent.change(passwordInput, { target: { value: 'test' } });
  const invalidError = await screen.findByText(ERROR.INVALID_PASSWORD);
  expect(invalidError).toBeTruthy();

  fireEvent.change(passwordInput, { target: { value: 'Passw0rd' } });
  const result = await waitForElementToBeRemoved(() =>
    screen.queryByText(ERROR.INVALID_PASSWORD)
  );
  expect(result).toBeTruthy();
});

// TODO Complete form submit after implementing onFinish method.
it('should submit form if no error', () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByRole('button');
  fireEvent.change(usernameInput, { target: { value: 'example@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password' } });
  fireEvent.click(button);
});
