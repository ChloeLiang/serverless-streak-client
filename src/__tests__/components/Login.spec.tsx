import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Login from '../../components/Login';
import ERROR from '../../constants/error';

jest.mock('aws-amplify');

it('should render basic component', () => {
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
  const button = screen.getByRole('button');

  fireEvent.click(button);
  const requiredError = await screen.findByText(ERROR.REQUIRED_PASSWORD);
  expect(requiredError).toBeTruthy();
});
