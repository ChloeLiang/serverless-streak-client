import { Goal, NewGoalForm } from '../constants/interface';

const transformNewGoal = (values: NewGoalForm) => {
  const { title, description, period, type, amount, checklist } = values;
  const newGoal: Goal = {
    title,
  };
  if (description) {
    newGoal.description = description;
  }
  if (period) {
    newGoal.startDate = period[0].format('YYYY-MM-DD Z');
    newGoal.endDate = period[1].format('YYYY-MM-DD Z');
  }
  if (type) {
    newGoal.type = type;
  }
  if (amount) {
    newGoal.amount = amount;
  }
  if (checklist.length > 0) {
    newGoal.checklist = checklist;
  }

  return newGoal;
};

export default transformNewGoal;
