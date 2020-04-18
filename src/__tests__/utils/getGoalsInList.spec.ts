import moment from 'moment';
import getGoalsInList from '../../utils/getGoalsInList';
import { goalCategory, goalType } from '../../constants/enum';
import { GoalResponse } from '../../constants/interface';

const goals: GoalResponse[] = [
  // Upcoming
  {
    goalId: '0',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      progress: 0,
    },
  },
  {
    goalId: '1',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      amount: 100,
      progress: 0,
    },
  },
  {
    goalId: '2',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [],
      progress: 0,
    },
  },
  // In progress
  {
    goalId: '3',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      amount: 100,
      progress: 0,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
  {
    goalId: '4',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      amount: 100,
      progress: 99,
      startDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
  {
    goalId: '5',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [
        { id: '1', isChecked: false, label: 'a' },
        { id: '2', isChecked: false, label: 'b' },
        { id: '3', isChecked: false, label: 'c' },
      ],
      progress: 0,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
  {
    goalId: '6',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [
        { id: '1', isChecked: true, label: 'a' },
        { id: '2', isChecked: false, label: 'b' },
        { id: '3', isChecked: false, label: 'c' },
      ],
      progress: 1,
      startDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
  // Done
  {
    goalId: '7',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      amount: 100,
      progress: 100,
      startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
  {
    goalId: '8',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [
        { id: '1', isChecked: true, label: 'a' },
        { id: '2', isChecked: true, label: 'b' },
        { id: '3', isChecked: true, label: 'c' },
      ],
      progress: 3,
      startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
];

it('should return upcoming goals', () => {
  expect(getGoalsInList(goals, goalCategory.UPCOMING)).toStrictEqual(
    goals.slice(0, 3)
  );
});

it('should return ongoing goals', () => {
  expect(getGoalsInList(goals, goalCategory.IN_PROGRESS)).toStrictEqual(
    goals.slice(3, 7)
  );
});

it('should return completed goals', () => {
  expect(getGoalsInList(goals, goalCategory.DONE)).toStrictEqual(
    goals.slice(7)
  );
});
