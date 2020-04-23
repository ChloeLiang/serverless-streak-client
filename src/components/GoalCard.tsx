import React, { FunctionComponent } from 'react';
import { Tag, Tooltip, Progress } from 'antd';
import getEndDateColor from '../utils/getEndDateColor';

interface Props {
  title: string;
  endDate: string | undefined;
  showProgress: boolean;
  progress: number;
  targetProgress: number;
  successPercent: number;
  targetPercent: number;
  progressTooltip: string;
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
      {props.showProgress && (
        <div>
          <div className="GoalCard__progress-top">
            <span>{props.progress}</span>
            <span className="GoalCard__progress-top-slash">/</span>
            <span>{props.targetProgress}</span>
          </div>
          <div className="GoalCard__progress-bottom">
            <Tooltip title={props.progressTooltip}>
              <Progress
                className="GoalCard__progress-bar"
                percent={props.targetPercent}
                successPercent={props.successPercent}
              />
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
