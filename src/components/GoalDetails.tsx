import React, { FunctionComponent, useEffect } from 'react';
import { Goal } from '../constants/interface';
import GoalForm from './GoalForm';
import { updateGoal } from '../services/goal';
import { tagEvent } from '../services/analytics';

const GoalDetails: FunctionComponent = () => {
  useEffect(() => {
    tagEvent({
      category: 'Goal Details Page',
      action: 'User navigates to goal details page',
      nonInteraction: true,
    });
  }, []);

  const onUpdateGoal = async (goal: Goal, id: string | undefined) => {
    if (id) {
      await updateGoal(id, goal);
      tagEvent({
        category: 'Update Goal',
        action: 'Click save button on goal details page',
      });
    }
  };

  return (
    <div className="goal-form-container">
      <GoalForm type="save" submitCallback={onUpdateGoal} />
    </div>
  );
};

export default GoalDetails;
