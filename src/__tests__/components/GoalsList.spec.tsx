import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import GoalsList from '../../components/GoalsList';
import { upcomingGoals } from '../../__mocks__/goals-list';

jest.mock('../../components/GoalCard', () => {
  return () => <p>GoalCard</p>;
});

it('should render a list of goals', () => {
  const { container } = render(
    <MemoryRouter>
      <GoalsList isLoading={false} title="Upcoming" goals={upcomingGoals} />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(screen.queryAllByText('GoalCard')).toHaveLength(upcomingGoals.length);
});

it('should show empty image if no goal list is empty', () => {
  render(
    <MemoryRouter>
      <GoalsList isLoading={false} title="Upcoming" goals={[]} />
    </MemoryRouter>
  );
  expect(screen.queryByTestId('empty')).toBeTruthy();
});
