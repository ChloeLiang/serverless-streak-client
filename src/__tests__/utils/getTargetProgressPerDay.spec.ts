import moment from 'moment';
import getTargetProgressPerDay from '../../utils/getTargetProgressPerDay';

it('should return correct target', () => {
  const startDate = moment().format('YYYY-MM-DD');
  const endDate = moment().add(29, 'days').format('YYYY-MM-DD');
  const amount = 300;
  expect(getTargetProgressPerDay(startDate, endDate, amount)).toEqual(10);
});
