import { GoalResponse } from '../constants/interface';
import { goalType } from '../constants/enum';

const goalCommon: GoalResponse = {
  goalId: 'goal-id',
  userId: 'user-id',
  createdAt: 1586948757972,
  content: {
    title: 'title',
    description: 'description',
    startDate: '2020-04-15',
    endDate: '2020-04-30',
    progress: 0,
  },
};

const goalNumber: GoalResponse = {
  ...goalCommon,
  content: {
    ...goalCommon.content,
    type: goalType.NUMBER,
    amount: 100,
  },
};

const goalChecklist: GoalResponse = {
  ...goalCommon,
  content: {
    ...goalCommon.content,
    type: goalType.CHECKLIST,
    checklist: [
      { id: '1', isChecked: false, label: 'a' },
      { id: '2', isChecked: false, label: 'b' },
      { id: '3', isChecked: false, label: 'c' },
    ],
  },
};

export { goalCommon, goalNumber, goalChecklist };
