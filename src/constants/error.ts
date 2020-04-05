enum ERROR {
  REQUIRED_USERNAME = 'Username is required',
  REQUIRED_PASSWORD = 'Password is required',
  INVALID_USERNAME = 'Username must be a valid email',
  INVALID_PASSWORD = 'Password must be at least 8 and not more than 20 non-whitespace characters.',
  INCORRECT_LOGIN = 'Incorrect username or password.',
}

export default ERROR;
