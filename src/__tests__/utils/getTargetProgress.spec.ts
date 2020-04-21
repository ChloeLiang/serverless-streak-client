import mockDate from 'mockdate';
import getTargetProgress from '../../utils/getTargetProgress';

mockDate.set('2020-04-20');

it.each([
  ['2020-04-20', '2020-04-21', 10, 5],
  ['2020-04-19', '2020-04-20', 10, 10],
  ['2020-04-15', '2020-04-30', 100, 37],
])(
  'should return target progress amount',
  (startDate, endDate, amount, expected) => {
    expect(getTargetProgress(startDate, endDate, amount)).toEqual(expected);
  }
);
