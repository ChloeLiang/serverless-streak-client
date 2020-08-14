import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import GoalForm from '../../components/GoalForm';
import * as goalService from '../../services/goal';

it('should render an empty form', () => {
  const { container } = render(
    <MemoryRouter>
      <GoalForm type="create" submitCallback={jest.fn()} />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should render form with data - number type', async () => {
  const goalResponse = {
    goalId: 'goal-id',
    userId: 'user-id',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      description: 'description',
      startDate: '2020-04-15',
      endDate: '2020-04-30',
      type: 1,
      progress: 0,
      amount: 100,
    },
  };
  const getGoal = jest.spyOn(goalService, 'getGoal');
  getGoal.mockResolvedValue(goalResponse);
  const { container } = render(
    <MemoryRouter initialEntries={['/goals/goal-id']}>
      <Route path="/goals/:id">
        <GoalForm type="save" submitCallback={jest.fn()} />
      </Route>
    </MemoryRouter>
  );
  await screen.findByLabelText(/Title/i);
  expect(container.firstChild).toMatchSnapshot();

  const {
    title,
    description,
    startDate,
    endDate,
    amount,
  } = goalResponse.content;
  expect(screen.getByLabelText(/Title/i)).toHaveValue(title);
  expect(screen.getByLabelText(/Description/i)).toHaveValue(description);
  expect(screen.queryByDisplayValue(startDate)).toBeTruthy();
  expect(screen.queryByDisplayValue(endDate)).toBeTruthy();
  expect(screen.getByLabelText(/Amount/i)).toHaveValue(amount.toString());
});

it('should render form with data - checklist type', async () => {
  const goalResponse = {
    goalId: 'goal-id',
    userId: 'user-id',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      description: 'description',
      startDate: '2020-04-15',
      endDate: '2020-04-30',
      type: 2,
      progress: 0,
      checklist: [
        { id: '1', label: 'a', isChecked: false },
        { id: '2', label: 'b', isChecked: false },
        { id: '3', label: 'c', isChecked: false },
      ],
    },
  };
  const getGoal = jest.spyOn(goalService, 'getGoal');
  getGoal.mockResolvedValue(goalResponse);
  const { container } = render(
    <MemoryRouter initialEntries={['/goals/goal-id']}>
      <Route path="/goals/:id">
        <GoalForm type="save" submitCallback={jest.fn()} />
      </Route>
    </MemoryRouter>
  );
  await screen.findByLabelText(/Title/i);
  expect(container.firstChild).toMatchSnapshot();

  const { title, description, startDate, endDate } = goalResponse.content;
  expect(screen.getByLabelText(/Title/i)).toHaveValue(title);
  expect(screen.getByLabelText(/Description/i)).toHaveValue(description);
  expect(screen.queryByDisplayValue(startDate)).toBeTruthy();
  expect(screen.queryByDisplayValue(endDate)).toBeTruthy();
  expect(screen.queryByTestId('checklist-item')).toBeTruthy();
});
