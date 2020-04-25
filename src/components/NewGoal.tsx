import React, { useEffect, FunctionComponent } from 'react';
import GoalForm from './GoalForm';
import { createGoal } from '../services/goal';
import { Goal } from '../constants/interface';
import { tagEvent } from '../services/analytics';

const NewGoal: FunctionComponent = () => {
  useEffect(() => {
    tagEvent({
      category: 'New Goal Page',
      action: 'User navigates to new goal page',
      nonInteraction: true,
    });
  }, []);

  const onCreateGoal = async (goal: Goal) => {
    await createGoal(goal);
    tagEvent({
      category: 'Create Goal',
      action: 'Click create button on new goal form',
    });
  };

  return (
    <div className="goal-form-container">
      <GoalForm type="create" submitCallback={onCreateGoal} />
    </div>
  );
};

export default NewGoal;
