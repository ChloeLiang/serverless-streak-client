import getUncompletedChecklistCount from '../../utils/getUncompletedChecklistCount';
import { Checklist } from '../../constants/interface';

it('should return correct number of unchecked items', () => {
  const checklist: Checklist[] = [
    { id: '1', isChecked: false, label: 'a' },
    { id: '2', isChecked: false, label: 'b' },
    { id: '3', isChecked: false, label: 'c' },
  ];
  expect(getUncompletedChecklistCount(checklist)).toEqual(3);
});

it('should return 0 if checklist is empty', () => {
  const checklist: Checklist[] = [];
  expect(getUncompletedChecklistCount(checklist)).toEqual(0);
});
