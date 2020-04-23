import moment from 'moment';
import { GoalResponse } from '../constants/interface';

const isGoalCompleted = (goal: GoalResponse) => {
  const {
    content: { amount, checklist, progress },
  } = goal;
  if (!progress) {
    return false;
  }
  if (amount) {
    return progress === amount;
  }
  if (checklist && checklist.length > 0) {
    return progress === checklist.length;
  }
  return false;
};

const isGoalUpcoming = (goal: GoalResponse) => {
  const today = moment().startOf('day');
  const startOfDay = (date: string) => moment(date).startOf('day');
  return (
    !isGoalCompleted(goal) &&
    (!goal.content.startDate ||
      today.isBefore(startOfDay(goal.content.startDate)))
  );
};

const isGoalInProgress = (goal: GoalResponse) => {
  const today = moment().startOf('day');
  const startOfDay = (date: string) => moment(date).startOf('day');

  return !!(
    goal.content.startDate &&
    today.isSameOrAfter(startOfDay(goal.content.startDate)) &&
    !isGoalCompleted(goal)
  );
};

export { isGoalUpcoming, isGoalInProgress, isGoalCompleted };
