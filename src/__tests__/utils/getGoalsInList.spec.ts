import getGoalsInList from '../../utils/getGoalsInList';
import { goalCategory } from '../../constants/enum';
import {
  goals,
  upcomingGoals,
  inProgressGoals,
  completedGoals,
} from '../../__mocks__/goals-list';

it('should return upcoming goals', () => {
  expect(getGoalsInList(goals, goalCategory.UPCOMING)).toStrictEqual(
    upcomingGoals
  );
});

it('should return ongoing goals', () => {
  expect(getGoalsInList(goals, goalCategory.IN_PROGRESS)).toStrictEqual(
    inProgressGoals
  );
});

it('should return completed goals', () => {
  expect(getGoalsInList(goals, goalCategory.DONE)).toStrictEqual(
    completedGoals
  );
});
