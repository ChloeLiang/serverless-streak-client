import moment from 'moment';
import { color } from '../constants/enum';

const getEndDateColor = (endDate: string) => {
  const today = moment().startOf('day');
  const targetDate = moment(endDate).startOf('day');

  if (targetDate.diff(today, 'day') >= 2) {
    return color.SUCCESS;
  }
  if (targetDate.diff(today, 'day') >= 0) {
    return color.WARNING;
  }
  if (targetDate.isBefore(today)) {
    return color.ERROR;
  }
};

export default getEndDateColor;
