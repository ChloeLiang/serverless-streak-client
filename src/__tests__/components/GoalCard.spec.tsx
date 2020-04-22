import React from 'react';
import { render, cleanup } from '@testing-library/react';
import mockDate from 'mockdate';
import GoalCard from '../../components/GoalCard';

mockDate.set('2020-04-07');

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(
    <GoalCard
      title="Title"
      endDate="2020-04-13"
      progress={0}
      targetProgress={10}
      isStarted
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
