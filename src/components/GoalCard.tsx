import React, { FunctionComponent } from 'react';
import { Tag, Tooltip, Progress } from 'antd';
import { Checklist } from '../constants/interface';
import getEndDateColor from '../utils/getEndDateColor';
import getTargetProgress from '../utils/getTargetProgress';

interface Props {
  title: string;
  startDate: string | undefined;
  endDate: string | undefined;
  amount: number;
  checklist: Checklist[];
  progress: number;
}

const GoalCard: FunctionComponent<Props> = (props) => {
  const isStarted =
    props.startDate &&
    props.endDate &&
    (props.amount > 0 || props.checklist.length > 0);

  return (
    <div className="GoalCard">
      <div className="GoalCard__header">
        <h3 className="GoalCard__title">{props.title}</h3>
        {props.endDate && (
          <Tag color={getEndDateColor(props.endDate)}>{props.endDate}</Tag>
        )}
      </div>
      {isStarted && (
        <div>
          <div className="GoalCard__progress-top">
            <span>{props.progress}</span>
            <span className="GoalCard__progress-top-slash">/</span>
            <span>
              {getTargetProgress(
                props.startDate!,
                props.endDate!,
                props.amount || props.checklist.length
              )}
            </span>
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
