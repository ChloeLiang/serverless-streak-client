import {
  isGoalCompleted,
  isGoalInProgress,
  isGoalUpcoming,
} from './getGoalStatus';
import { GoalResponse } from '../constants/interface';
import { goalCategory } from '../constants/enum';

const getGoalsInList = (goals: GoalResponse[], category: goalCategory) => {
  if (category === goalCategory.UPCOMING) {
    return goals.filter((goal) => isGoalUpcoming(goal));
  }
  if (category === goalCategory.IN_PROGRESS) {
    return goals.filter((goal) => isGoalInProgress(goal));
  }
  if (category === goalCategory.DONE) {
    return goals.filter((goal) => isGoalCompleted(goal));
  }
  return goals;
};

export default getGoalsInList;
