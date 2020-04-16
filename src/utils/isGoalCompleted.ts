import { GoalResponse } from '../constants/interface';

const isGoalCompleted = (goal: GoalResponse) => {
  const {
    progress,
    content: { amount, checklist },
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

export default isGoalCompleted;
