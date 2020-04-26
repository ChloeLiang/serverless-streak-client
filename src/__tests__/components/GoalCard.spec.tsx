import React from 'react';
import { render } from '@testing-library/react';
import mockDate from 'mockdate';
import GoalCard from '../../components/GoalCard';

mockDate.set('2020-04-07');

it('should render basic component - behind target', () => {
  const { container } = render(
    <GoalCard
      title="Title"
      endDate="2020-04-13"
      endDateColor="#87d068"
      progress={0}
      targetProgress={10}
      showProgress
      targetPercent={60}
      successPercent={30}
      progressTooltip="30 done / 30 in progress / 40 to do"
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should render basic component - ahead of target', () => {
  const { container } = render(
    <GoalCard
      title="Title"
      endDate="2020-04-13"
      endDateColor="#87d068"
      progress={10}
      targetProgress={10}
      showProgress
      targetPercent={10}
      successPercent={10}
      progressTooltip="10 done / 10 in progress / 90 to do"
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
