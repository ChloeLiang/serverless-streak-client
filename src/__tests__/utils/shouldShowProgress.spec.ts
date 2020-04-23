import shouldShowProgress from '../../utils/shouldShowProgress';
import {
  upcomingGoals,
  inProgressGoals,
  completedGoals,
} from '../../__mocks__/goals-list';

it('should return false for upcoming goals', () => {
  upcomingGoals.forEach((goal) => {
    expect(shouldShowProgress(goal)).toEqual(false);
  });
});

it('should return true for goals in progress', () => {
  inProgressGoals.forEach((goal) => {
    expect(shouldShowProgress(goal)).toEqual(true);
  });
});

it('should return false for completed goals', () => {
  completedGoals.forEach((goal) => {
    expect(shouldShowProgress(goal)).toEqual(false);
  });
});
