import isGoalCompleted from '../../utils/isGoalCompleted';
import { goalNumber, goalChecklist } from '../../__mocks__/goal-response';
import { GoalResponse } from '../../constants/interface';

it('should return false if no progress', () => {
  expect(isGoalCompleted(goalNumber)).toBeFalsy();
  expect(isGoalCompleted(goalChecklist)).toBeFalsy();
});

it('should return true if progress equals to amount', () => {
  const goal: GoalResponse = {
    ...goalNumber,
    content: {
      ...goalNumber.content,
      progress: 100,
    },
  };
  expect(isGoalCompleted(goal)).toBeTruthy();
});

it('should return false if progress is less than amount', () => {
  const goal: GoalResponse = {
    ...goalNumber,
    content: {
      ...goalNumber.content,
      progress: 99,
    },
  };
  expect(isGoalCompleted(goal)).toBeFalsy();
});

it('should return true if progress equals number of checklist items', () => {
  const goal: GoalResponse = {
    ...goalChecklist,
    content: {
      ...goalChecklist.content,
      checklist: [
        { id: '1', isChecked: true, label: 'a' },
        { id: '2', isChecked: true, label: 'b' },
        { id: '3', isChecked: true, label: 'c' },
      ],
      progress: 3,
    },
  };
  expect(isGoalCompleted(goal)).toBeTruthy();
});

it('should return false if progress is less than number of checklist items', () => {
  const goal: GoalResponse = {
    ...goalChecklist,
    content: {
      ...goalChecklist.content,
      checklist: [
        { id: '1', isChecked: true, label: 'a' },
        { id: '2', isChecked: true, label: 'b' },
        { id: '3', isChecked: false, label: 'c' },
      ],
      progress: 2,
    },
  };
  expect(isGoalCompleted(goal)).toBeFalsy();
});
