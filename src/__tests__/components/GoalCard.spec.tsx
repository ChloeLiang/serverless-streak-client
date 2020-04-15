import React from 'react';
import { render, cleanup } from '@testing-library/react';
import GoalCard from '../../components/GoalCard';

afterEach(cleanup);

it('should render basic component', () => {
  const { container } = render(
    <GoalCard title="Title" endDate="2020-04-13" amount={100} checklist={[]} />
  );
  expect(container.firstChild).toMatchSnapshot();
});
