import getProgressTooltip from '../../utils/getProgressTooltip';

it.each([
  [-1, -1, 0, '0 done / 0 in progress / 0 to do'],
  [1, 3, 10, '1 done / 2 in progress / 7 to do'],
  [4, 3, 10, '4 done / 0 in progress / 6 to do'],
  [10, 10, 10, '10 done'],
  [10, 9, 10, '10 done'],
])(
  'should return progress tooltip',
  (progress, targetProgress, totalAmount, expected) => {
    expect(getProgressTooltip(progress, targetProgress, totalAmount)).toEqual(
      expected
    );
  }
);
