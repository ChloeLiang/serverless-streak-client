import { GoalResponse } from '../constants/interface';
import { isGoalInProgress } from './getGoalStatus';

const shouldShowProgress = (goal: GoalResponse) => {
  const { amount, checklist } = goal.content;
  return !!(
    isGoalInProgress(goal) &&
    ((amount && amount > 0) || (checklist && checklist.length > 0))
  );
};

export default shouldShowProgress;
