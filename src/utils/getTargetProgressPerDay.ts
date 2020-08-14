import moment from 'moment';

const getTargetProgressPerDay = (
  startDate: string | undefined,
  endDate: string | undefined,
  amount: number | undefined
) => {
  if (!startDate || !endDate || !amount) {
    return -1;
  }
  const startOfDay = moment(startDate).startOf('day');
  const endOfDay = moment(endDate).endOf('day');
  const period = endOfDay.diff(startOfDay, 'day') + 1;
  return Math.floor(amount / period);
};

export default getTargetProgressPerDay;
