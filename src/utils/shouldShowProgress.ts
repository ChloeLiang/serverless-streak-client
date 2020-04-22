import { Checklist } from '../constants/interface';

const shouldShowProgress = (
  startDate: string | undefined,
  endDate: string | undefined,
  amount: number | undefined,
  checklist: Checklist[] | undefined
) => {
  return !!(
    startDate &&
    endDate &&
    ((amount && amount > 0) || (checklist && checklist.length > 0))
  );
};

export default shouldShowProgress;
