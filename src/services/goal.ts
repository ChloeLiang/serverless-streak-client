import { API } from 'aws-amplify';
import AWS from '../constants/aws';
import { Goal } from '../constants/interface';

function createGoal(goal: { content: Goal }) {
  return API.post(AWS.API_NAME, '/goals', {
    body: goal,
  });
}

export { createGoal };
