import getEndDateColor from '../../utils/getEndDateColor';
import { color } from '../../constants/enum';
import {
  upcomingGoals,
  inProgressGoals,
  completedGoals,
} from '../../__mocks__/goals-list';

afterEach(jest.clearAllMocks);

it('should return color.UPCOMING if goal is not started', () => {
  upcomingGoals.forEach((goal) => {
    expect(getEndDateColor(goal)).toEqual(color.UPCOMING);
  });
});

it('should return color.SUCCESS if goal is in progress and end date is > 2 days after today', () => {
  inProgressGoals.slice(0, inProgressGoals.length - 1).forEach((goal) => {
    expect(getEndDateColor(goal)).toEqual(color.SUCCESS);
  });
});

it('should return color.WARNING if goal is in progress and end date is 1 day after today', () => {
  expect(getEndDateColor(inProgressGoals[inProgressGoals.length - 1])).toEqual(
    color.WARNING
  );
});

it('should return color.DONE if goal is done', () => {
  completedGoals.forEach((goal) => {
    expect(getEndDateColor(goal)).toEqual(color.DONE);
  });
});
