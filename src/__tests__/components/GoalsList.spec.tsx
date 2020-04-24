import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import GoalsList from '../../components/GoalsList';
import { upcomingGoals } from '../../__mocks__/goals-list';

it('should render a list of goals', () => {
  const { container } = render(
    <MemoryRouter>
      <GoalsList isLoading={false} title="Upcoming" goals={upcomingGoals} />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
