import React, { FunctionComponent } from 'react';

interface Props {
  title: string;
}

const GoalCard: FunctionComponent<Props> = (props) => {
  return (
    <div className="GoalCard">
      <div className="GoalCard__header">
        <h3 className="GoalCard__title">{props.title}</h3>
      </div>
    </div>
  );
};

export default GoalCard;
