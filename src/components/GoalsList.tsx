import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { GoalResponse } from '../constants/interface';
import { Card } from 'antd';

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
          <Card title={goal.content.title}>
            <p>Content</p>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GoalsList;
