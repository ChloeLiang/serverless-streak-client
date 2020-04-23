import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import GoalCard from './GoalCard';
import { GoalResponse } from '../constants/interface';
import getTargetProgress from '../utils/getTargetProgress';
import shouldShowProgress from '../utils/shouldShowProgress';
import getProgressPercent from '../utils/getProgressPercent';
import getProgressTooltip from '../utils/getProgressTooltip';

interface Props {
  title: string;
  goals: GoalResponse[];
}

const GoalsList: FunctionComponent<Props> = (props) => {
  return (
    <div className="GoalsList">
      <h4>{props.title}</h4>
      <div className="GoalsList__cards">
        {props.goals.map((goal: GoalResponse) => {
          const {
            title,
            startDate,
            endDate,
            amount,
            checklist,
            progress,
          } = goal.content;
          const showProgress = shouldShowProgress(goal);
          const totalAmount = amount || (checklist && checklist.length) || 0;
          const targetProgress = getTargetProgress(
            startDate,
            endDate,
            totalAmount
          );
          const { targetPercent, successPercent } = getProgressPercent(
            progress,
            targetProgress,
            totalAmount
          );

          return (
            <Link key={goal.goalId} to={`/goals/${goal.goalId}`}>
              <GoalCard
                title={title}
                endDate={endDate}
                progress={progress}
                targetProgress={targetProgress}
                showProgress={showProgress}
                targetPercent={targetPercent}
                successPercent={successPercent}
                progressTooltip={getProgressTooltip(
                  progress,
                  targetProgress,
                  totalAmount
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
