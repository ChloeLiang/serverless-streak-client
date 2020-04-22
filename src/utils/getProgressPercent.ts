const getProgressPercent = (
  progress: number,
  targetProgress: number,
  totalAmount: number
) => {
  if (targetProgress <= 0 || totalAmount <= 0) {
    return {
      targetPercent: 0,
      successPercent: 0,
    };
  }
  const targetPercent = Math.floor((targetProgress / totalAmount) * 100);
  const successPercent = Math.floor((progress / totalAmount) * 100);
  return {
    targetPercent,
    successPercent,
  };
};

export default getProgressPercent;
