import React, { FunctionComponent } from 'react';
import GoalForm from './GoalForm';
import { createGoal } from '../services/goal';
import { Goal } from '../constants/interface';

const NewGoal: FunctionComponent = () => {
  const onCreateGoal = async (goal: Goal) => {
    await createGoal(goal);
  };

  return (
    <div className="goal-form-container">
      <GoalForm type="create" submitCallback={onCreateGoal} />
    </div>
  );
};

export default NewGoal;
