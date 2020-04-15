import mockDate from 'mockdate';
import getEndDateColor from '../../utils/getEndDateColor';
import { color } from '../../constants/enum';

mockDate.set('2020-04-13');

afterEach(jest.clearAllMocks);

it('should return color.SUCCESS if end date is 2 days after today', () => {
  const endDate = '2020-04-15';
  expect(getEndDateColor(endDate)).toEqual(color.SUCCESS);
});

it('should return color.WARNING if end date is 1 day after today', () => {
  const endDate = '2020-04-14';
  expect(getEndDateColor(endDate)).toEqual(color.WARNING);
});

it('should return color.WARNING if end date is today', () => {
  const endDate = '2020-04-13';
  expect(getEndDateColor(endDate)).toEqual(color.WARNING);
});

it('should return color.ERROR if end date is 1 day after today', () => {
  const endDate = '2020-04-12';
  expect(getEndDateColor(endDate)).toEqual(color.ERROR);
});
