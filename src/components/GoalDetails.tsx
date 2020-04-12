import React, { useState, useEffect, FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getGoal } from '../services/goal';
import { GoalResponse } from '../constants/interface';

const GoalDetails: FunctionComponent = () => {
  const [goal, setGoal] = useState<GoalResponse | null>(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const onLoad = async () => {
      try {
        if (id) {
          const goal = await getGoal(id);
          setGoal(goal);
        }
      } catch (e) {
        // TODO: handle error
        console.error(e);
      }
    };
    onLoad();
  }, [id]);

  return <p>Goal Details</p>;
};

export default GoalDetails;
