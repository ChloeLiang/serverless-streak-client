import moment from 'moment';
import { goalType } from '../constants/enum';
import { GoalResponse } from '../constants/interface';

const upcomingGoals: GoalResponse[] = [
  {
    goalId: '1',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      progress: 0,
    },
  },
  {
    goalId: '2',
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
    goalId: '3',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [],
      progress: 0,
    },
  },
  {
    goalId: '4',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.CHECKLIST,
      checklist: [],
      progress: 0,
    },
  },
  {
    goalId: '5',
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      progress: 0,
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
];

const inProgressIndexOffset = upcomingGoals.length;

const inProgressGoals: GoalResponse[] = [
  {
    goalId: (inProgressIndexOffset + 1).toString(),
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
    goalId: (inProgressIndexOffset + 2).toString(),
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
    goalId: (inProgressIndexOffset + 3).toString(),
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
    goalId: (inProgressIndexOffset + 4).toString(),
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
];

const completedIndexOffset = upcomingGoals.length + inProgressGoals.length;

const completedGoals: GoalResponse[] = [
  {
    goalId: (completedIndexOffset + 1).toString(),
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
    goalId: (completedIndexOffset + 2).toString(),
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
  {
    goalId: (completedIndexOffset + 3).toString(),
    userId: '1',
    createdAt: 1586948757972,
    content: {
      title: 'title',
      type: goalType.NUMBER,
      amount: 100,
      progress: 100,
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    },
  },
];

const goals = upcomingGoals.concat(inProgressGoals).concat(completedGoals);

export { goals, upcomingGoals, inProgressGoals, completedGoals };
