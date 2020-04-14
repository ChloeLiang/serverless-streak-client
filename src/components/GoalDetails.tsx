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

  return (
    <div className="goal-form-container">
      <GoalForm type="save" submitCallback={onUpdateGoal} />
    </div>
  );
};

export default GoalDetails;
