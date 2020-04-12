import { API } from 'aws-amplify';
import AWS from '../constants/aws';
import { Goal } from '../constants/interface';

function createGoal(goal: Goal) {
  return API.post(AWS.API_NAME, '/goals', {
    body: {
      content: goal,
    },
  });
}

function getGoals() {
  return API.get(AWS.API_NAME, '/goals', null);
}

function getGoal(id: string) {
  return API.get(AWS.API_NAME, `/goals/${id}`, null);
}

export { createGoal, getGoals, getGoal };
