import React, { FunctionComponent } from 'react';
import { Tag, Tooltip, Progress, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Checklist } from '../constants/interface';
import getEndDateColor from '../utils/getEndDateColor';

interface Props {
  title: string;
  endDate: string | undefined;
  amount: number;
  checklist: Checklist[];
}

const GoalCard: FunctionComponent<Props> = (props) => {
  const isStarted =
    props.endDate && (props.amount > 0 || props.checklist.length > 0);
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
            <span>0 / 180</span>
            {props.amount > 0 && (
              <Button shape="circle" icon={<EditOutlined />} />
            )}
          </div>
          <div>
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
