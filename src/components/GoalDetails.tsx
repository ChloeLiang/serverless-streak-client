import React, { FunctionComponent } from 'react';
import { Goal } from '../constants/interface';
import GoalForm from './GoalForm';
import { updateGoal } from '../services/goal';

const GoalDetails: FunctionComponent = () => {
  const onUpdateGoal = async (goal: Goal, id: string | undefined) => {
    if (id) {
      await updateGoal(id, goal);
    }
  };

  return <GoalForm type="save" submitCallback={onUpdateGoal} />;
};

export default GoalDetails;
