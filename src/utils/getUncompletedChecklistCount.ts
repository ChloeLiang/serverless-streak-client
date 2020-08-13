import { Checklist } from '../constants/interface';

const getUncompletedChecklistCount = (checklist: Checklist[]) => {
  return checklist.filter((item) => item.isChecked === false).length;
};

export default getUncompletedChecklistCount;
