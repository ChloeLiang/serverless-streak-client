import getProgressPercent from '../../utils/getProgressPercent';

it.each([
  [0, -1, 0, { targetPercent: 0, successPercent: 0 }],
  [1, 3, 10, { targetPercent: 30, successPercent: 10 }],
  [3, 3, 10, { targetPercent: 30, successPercent: 30 }],
  [3, 2, 10, { targetPercent: 20, successPercent: 30 }],
  [0, 3, 10, { targetPercent: 30, successPercent: 0 }],
])(
  'should return progress percent',
  (progress, targetProgress, totalAmount, expected) => {
    expect(
      getProgressPercent(progress, targetProgress, totalAmount)
    ).toStrictEqual(expected);
  }
);
