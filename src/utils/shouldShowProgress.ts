import moment from 'moment';
import { GoalResponse } from '../constants/interface';
import isGoalCompleted from './isGoalCompleted';

const shouldShowProgress = (goal: GoalResponse) => {
  const { startDate, endDate, amount, checklist } = goal.content;
  return !!(
    startDate &&
    endDate &&
    moment(startDate).startOf('day').isSameOrBefore(moment().startOf('day')) &&
    ((amount && amount > 0) || (checklist && checklist.length > 0)) &&
    !isGoalCompleted(goal)
  );
};

export default shouldShowProgress;
