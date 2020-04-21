import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import GoalCard from './GoalCard';
import { GoalResponse } from '../constants/interface';

interface Props {
  title: string;
  goals: GoalResponse[];
}

const GoalsList: FunctionComponent<Props> = (props) => {
  return (
    <div className="GoalsList">
      <h4>{props.title}</h4>
      {props.goals.map((goal) => (
        <Link key={goal.goalId} to={`/goals/${goal.goalId}`}>
          <GoalCard
            title={goal.content.title}
            startDate={goal.content.startDate}
            endDate={goal.content.endDate}
            amount={goal.content.amount || 0}
            checklist={goal.content.checklist || []}
            progress={goal.content.progress}
          />
        </Link>
      ))}
    </div>
  );
};

export default GoalsList;
