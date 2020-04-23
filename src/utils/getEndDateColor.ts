import moment from 'moment';
import { color } from '../constants/enum';
import { GoalResponse } from '../constants/interface';
import { isGoalCompleted, isGoalInProgress } from '../utils/getGoalStatus';

const getEndDateColor = (goal: GoalResponse) => {
  const { endDate } = goal.content;
  const today = moment().startOf('day');
  const targetDate = moment(endDate).startOf('day');

  if (isGoalCompleted(goal)) {
    return color.DONE;
  }
  if (isGoalInProgress(goal) && targetDate.diff(today, 'day') >= 2) {
    return color.SUCCESS;
  }
  if (isGoalInProgress(goal) && targetDate.diff(today, 'day') >= 0) {
    return color.WARNING;
  }
  if (isGoalInProgress(goal) && targetDate.isBefore(today)) {
    return color.ERROR;
  }
  return color.UPCOMING;
};

export default getEndDateColor;
