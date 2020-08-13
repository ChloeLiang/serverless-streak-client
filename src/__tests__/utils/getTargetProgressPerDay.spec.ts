import moment from 'moment';
import getTargetProgressPerDay from '../../utils/getTargetProgressPerDay';

it('should return correct target if today is before end date', () => {
  const endDate = moment().add(29, 'days').toString();
  const amount = 300;
  expect(getTargetProgressPerDay(endDate, amount)).toEqual(10);
});

it('should return correct target if today is after end date', () => {
  const endDate = moment().subtract(29, 'days').toString();
  const amount = 300;
  expect(getTargetProgressPerDay(endDate, amount)).toEqual(300);
});

it('should return correct target if today is same as end date', () => {
  const endDate = moment().toString();
  const amount = 300;
  expect(getTargetProgressPerDay(endDate, amount)).toEqual(300);
});
