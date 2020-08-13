import moment from 'moment';

const getTargetProgressPerDay = (
  endDate: string | undefined,
  amount: number | undefined
) => {
  if (!endDate || !amount) {
    return -1;
  }
  const startOfDay = moment().isBefore(moment(endDate))
    ? moment().startOf('day')
    : moment(endDate).startOf('day');
  const endOfDay = moment(endDate).endOf('day');
  const period = endOfDay.diff(startOfDay, 'day') + 1;
  return Math.floor(amount / period);
};

export default getTargetProgressPerDay;
