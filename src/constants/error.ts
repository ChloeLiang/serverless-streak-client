enum ERROR {
  REQUIRED_USERNAME = 'Username is required.',
  REQUIRED_PASSWORD = 'Password is required.',
  INVALID_USERNAME = 'Username must be a valid email.',
  INVALID_PASSWORD = 'Password must be at least 8 and not more than 20 non-whitespace characters.',
  INCORRECT_LOGIN = 'Incorrect username or password.',
  CONFIRM_PASSWORD = 'The two passwords that you entered do not match.',
  CONFIRMATION_CODE = 'Confirmation code is required.',
}

export default ERROR;
