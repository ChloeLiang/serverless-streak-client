import {
  isGoalCompleted,
  isGoalUpcoming,
  isGoalInProgress,
} from '../../utils/getGoalStatus';
import {
  upcomingGoals,
  completedGoals,
  inProgressGoals,
} from '../../__mocks__/goals-list';

it('should return true if goal is upcoming', () => {
  upcomingGoals.forEach((goal) => {
    expect(isGoalUpcoming(goal)).toBeTruthy();
    expect(isGoalInProgress(goal)).toBeFalsy();
    expect(isGoalCompleted(goal)).toBeFalsy();
  });
});

it('should return true if goal is in progress', () => {
  inProgressGoals.forEach((goal) => {
    expect(isGoalInProgress(goal)).toBeTruthy();
    expect(isGoalUpcoming(goal)).toBeFalsy();
    expect(isGoalCompleted(goal)).toBeFalsy();
  });
});

it('should return true if goal is completed', () => {
  completedGoals.forEach((goal) => {
    expect(isGoalCompleted(goal)).toBeTruthy();
    expect(isGoalUpcoming(goal)).toBeFalsy();
    expect(isGoalInProgress(goal)).toBeFalsy();
  });
});
