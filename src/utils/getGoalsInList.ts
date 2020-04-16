import moment from 'moment';
import isGoalCompleted from './isGoalCompleted';
import { GoalResponse } from '../constants/interface';
import { goalCategory } from '../constants/enum';

const getGoalsInList = (goals: GoalResponse[], category: goalCategory) => {
  const today = moment().startOf('day');
  const startOfDay = (date: string) => moment(date).startOf('day');
  if (category === goalCategory.UPCOMING) {
    return goals.filter(
      (goal) =>
        !goal.content.startDate ||
        today.isBefore(startOfDay(goal.content.startDate))
    );
  }
  if (category === goalCategory.IN_PROGRESS) {
    return goals.filter(
      (goal) =>
        goal.content.startDate &&
        today.isSameOrAfter(startOfDay(goal.content.startDate)) &&
        !isGoalCompleted(goal)
    );
  }
  if (category === goalCategory.DONE) {
    return goals.filter((goal) => isGoalCompleted(goal));
  }
  return goals;
};

export default getGoalsInList;
