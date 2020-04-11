import moment from 'moment';
import transformNewGoal from '../../utils/transformNewGoal';
import { goalType } from '../../constants/enum';

it('should return title if only title is defined', () => {
  const values = {
    title: 'title',
    description: undefined,
    period: undefined,
    type: undefined,
  };
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
  });
});

it('should return description', () => {
  const values = {
    title: 'title',
    description: 'description',
    period: undefined,
    type: undefined,
  };
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
    description: 'description',
  });
});

it('should return startDate and endDate', () => {
  const values = {
    title: 'title',
    description: undefined,
    period: [moment.utc('2020-04-11'), moment.utc('2020-05-11')],
    type: undefined,
  };
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
    startDate: '2020-04-11 +00:00',
    endDate: '2020-05-11 +00:00',
  });
});

it('should return type', () => {
  const values = {
    title: 'title',
    description: undefined,
    period: undefined,
    type: goalType.NUMBER,
  };
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
    type: goalType.NUMBER,
  });

  values.type = goalType.CHECKLIST;
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
    type: goalType.CHECKLIST,
  });
});

it('should return amount', () => {
  const values = {
    title: 'title',
    description: undefined,
    period: undefined,
    type: goalType.NUMBER,
    amount: 100,
  };
  expect(transformNewGoal(values)).toStrictEqual({
    title: 'title',
    type: goalType.NUMBER,
    amount: 100,
  });
});
