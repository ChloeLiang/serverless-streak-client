import moment from 'moment';

const getTargetProgress = (
  startDate: string,
  endDate: string,
  amount: number
) => {
  const startOfDay = moment(startDate).startOf('day');
  const endOfDay = moment(endDate).endOf('day');
  const today = moment().startOf('day');
  const period = endOfDay.diff(startOfDay, 'day') + 1;
  const daysPassed = today.diff(startOfDay, 'day') + 1;
  return Math.floor((amount / period) * daysPassed);
};

export default getTargetProgress;
