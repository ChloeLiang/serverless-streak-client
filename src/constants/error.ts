enum ERROR {
  // Sign up / Login
  REQUIRED_USERNAME = 'Username is required.',
  REQUIRED_PASSWORD = 'Password is required.',
  INVALID_USERNAME = 'Username must be a valid email.',
  INVALID_PASSWORD = 'Password must be 8-20 length and requires uppercase, lowercase letter and number',
  INCORRECT_LOGIN = 'Incorrect username or password.',
  CONFIRM_PASSWORD = 'Passwords do not match.',
  CONFIRMATION_CODE = 'Confirmation code is required.',

  // New Goal
  REQUIRED_TITLE = 'Title is required.',
}

export default ERROR;
