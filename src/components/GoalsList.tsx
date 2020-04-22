import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import GoalCard from './GoalCard';
import { GoalResponse } from '../constants/interface';
import getTargetProgress from '../utils/getTargetProgress';
import shouldShowProgress from '../utils/shouldShowProgress';

interface Props {
  title: string;
  goals: GoalResponse[];
}

const GoalsList: FunctionComponent<Props> = (props) => {
  return (
    <div className="GoalsList">
      <h4>{props.title}</h4>
      {props.goals.map((goal) => {
        const {
          title,
          startDate,
          endDate,
          amount,
          checklist,
          progress,
        } = goal.content;
        const isStarted = shouldShowProgress(
          startDate,
          endDate,
          amount,
          checklist
        );
        const targetProgress = getTargetProgress(
          startDate,
          endDate,
          amount || (checklist && checklist.length)
        );
        return (
          <Link key={goal.goalId} to={`/goals/${goal.goalId}`}>
            <GoalCard
              title={title}
              endDate={endDate}
              progress={progress}
              targetProgress={targetProgress}
              isStarted={isStarted}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default GoalsList;
