import React from 'react';
import { render } from '@testing-library/react';
import GoalDetails from '../../components/GoalDetails';

jest.mock('../../components/GoalForm.tsx', () => {
  return () => <p>Goal Form</p>;
});

it('should render goal details', () => {
  const { container } = render(<GoalDetails />);
  expect(container.firstChild).toMatchSnapshot();
});
