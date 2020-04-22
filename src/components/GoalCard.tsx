import React, { FunctionComponent } from 'react';
import { Tag, Tooltip, Progress } from 'antd';
import getEndDateColor from '../utils/getEndDateColor';

interface Props {
  title: string;
  endDate: string | undefined;
  progress: number;
  targetProgress: number;
  isStarted: boolean;
}

const GoalCard: FunctionComponent<Props> = (props) => {
  return (
    <div className="GoalCard">
      <div className="GoalCard__header">
        <h3 className="GoalCard__title">{props.title}</h3>
        {props.endDate && (
          <Tag color={getEndDateColor(props.endDate)}>{props.endDate}</Tag>
        )}
      </div>
      {props.isStarted && (
        <div>
          <div className="GoalCard__progress-top">
            <span>{props.progress}</span>
            <span className="GoalCard__progress-top-slash">/</span>
            <span>{props.targetProgress}</span>
          </div>
          <div className="GoalCard__progress-bottom">
            <Tooltip title="3 done / 3 in progress / 4 to do">
              <Progress percent={60} successPercent={30} />
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
