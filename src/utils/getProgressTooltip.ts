const getProgressTooltip = (
  progress: number,
  targetProgress: number,
  totalAmount: number
) => {
  if (progress >= totalAmount) {
    return `${totalAmount} done`;
  }
  const numOfDone = progress > 0 ? progress : 0;
  const numOfInProgress =
    targetProgress > progress ? targetProgress - progress : 0;
  const numOfTodo =
    totalAmount > 0
      ? totalAmount - (targetProgress > progress ? targetProgress : progress)
      : 0;
  return `${numOfDone} done / ${numOfInProgress} in progress / ${numOfTodo} to do`;
};

export default getProgressTooltip;
