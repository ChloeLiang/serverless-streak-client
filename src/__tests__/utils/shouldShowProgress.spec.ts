import shouldShowProgress from '../../utils/shouldShowProgress';

it.each([
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, 10, undefined],
  [undefined, undefined, undefined, []],
  ['2020-04-01', '2020-04-30', undefined, undefined],
  ['2020-04-01', '2020-04-30', 0, undefined],
  ['2020-04-01', '2020-04-30', undefined, []],
])('should return false', (startDate, endDate, amount, checklist) => {
  expect(shouldShowProgress(startDate, endDate, amount, checklist)).toEqual(
    false
  );
});

it.each([
  ['2020-04-01', '2020-04-30', 10, undefined],
  [
    '2020-04-01',
    '2020-04-30',
    undefined,
    [{ id: '1', label: 'a', isChecked: false }],
  ],
])('should return true', (startDate, endDate, amount, checklist) => {
  expect(shouldShowProgress(startDate, endDate, amount, checklist)).toEqual(
    true
  );
});
